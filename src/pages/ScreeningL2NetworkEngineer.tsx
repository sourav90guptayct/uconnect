import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { L2_SCREENING_QUESTIONS, pickBalancedQuestions, type ScreeningQuestion } from "@/data/l2ScreeningQuestions";
import { AlertCircle, Circle, Camera, ShieldAlert, Upload, FileText } from "lucide-react";

type Step = "intro" | "test" | "done";

const TEST_MINUTES = 30;
const BRAND = "#1f4e79";

interface FormState {
  candidate_name: string;
  email: string;
  phone: string;
  current_location: string;
  qualification: string;
  total_experience: string;
  relevant_experience: string;
  current_company: string;
  current_designation: string;
  owns_laptop: string;
  comfortable_manesar: string;
  comfortable_shifts: string;
  joining_availability: string;
  current_ctc: string;
  expected_ctc: string;
  comfortable_25k: string;
}

const initialForm: FormState = {
  candidate_name: "", email: "", phone: "", current_location: "",
  qualification: "", total_experience: "", relevant_experience: "",
  current_company: "", current_designation: "",
  owns_laptop: "", comfortable_manesar: "", comfortable_shifts: "",
  joining_availability: "", current_ctc: "", expected_ctc: "", comfortable_25k: "",
};

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60) || "candidate";
}

export default function ScreeningL2NetworkEngineer() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [form, setForm] = useState<FormState>(initialForm);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [questions, setQuestions] = useState<ScreeningQuestion[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(TEST_MINUTES * 60);
  const [submitting, setSubmitting] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraLost, setCameraLost] = useState(false);
  const [violations, setViolations] = useState({ tab_switches: 0, fullscreen_exits: 0, window_blurs: 0 });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const smallVideoRef = useRef<HTMLVideoElement | null>(null);
  const warnedRef = useRef(false);
  const submittedRef = useRef(false);

  // Attach stream to whichever preview is mounted
  useEffect(() => {
    const s = streamRef.current;
    if (!s) return;
    if (videoRef.current && !videoRef.current.srcObject) videoRef.current.srcObject = s;
    if (smallVideoRef.current && !smallVideoRef.current.srcObject) smallVideoRef.current.srcObject = s;
  }, [step, cameraReady]);

  const requestCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });
      streamRef.current = stream;
      setCameraReady(true);
      // Detect track ending
      stream.getVideoTracks().forEach((t) => {
        t.addEventListener("ended", () => setCameraLost(true));
      });
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 50);
    } catch (err: any) {
      setCameraReady(false);
      setCameraError("Camera access is required to take this test. Please enable your camera and reload.");
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const mimeCandidates = ["video/webm;codecs=vp8,opus", "video/webm;codecs=vp9,opus", "video/webm"];
    const mime = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || "video/webm";
    const rec = new MediaRecorder(streamRef.current, { mimeType: mime, videoBitsPerSecond: 500_000 });
    rec.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data); };
    rec.start(2000); // gather chunks every 2s
    recorderRef.current = rec;
  };

  const stopRecordingAndGetBlob = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const rec = recorderRef.current;
      const done = () => resolve(new Blob(chunksRef.current, { type: "video/webm" }));
      if (!rec || rec.state === "inactive") { done(); return; }
      // Safety timeout so we never hang the submit if onstop never fires.
      const t = setTimeout(done, 4000);
      rec.onstop = () => { clearTimeout(t); done(); };
      try { rec.stop(); } catch { clearTimeout(t); done(); }
    });
  };

  const enterFullscreen = async () => {
    try { await document.documentElement.requestFullscreen(); } catch { /* ignore */ }
  };

  const beginTest = async () => {
    if (!cameraReady || !streamRef.current) {
      toast.error("Please allow camera access first.");
      return;
    }
    setQuestions(pickBalancedQuestions()); // 10 easy + 10 moderate + 5 hard, randomized
    setStep("test");
    setSecondsLeft(TEST_MINUTES * 60);
    startRecording();
    await enterFullscreen();
  };

  // Anti-cheating monitoring
  useEffect(() => {
    if (step !== "test") return;
    const warn = () => {
      if (!warnedRef.current) {
        warnedRef.current = true;
        toast.warning("Warning: switching tabs is being recorded.");
      }
    };
    const onVis = () => {
      if (document.hidden) {
        setViolations((v) => ({ ...v, tab_switches: v.tab_switches + 1 }));
        warn();
      }
    };
    const onBlur = () => {
      setViolations((v) => ({ ...v, window_blurs: v.window_blurs + 1 }));
      warn();
    };
    const onFs = () => {
      if (!document.fullscreenElement) {
        setViolations((v) => ({ ...v, fullscreen_exits: v.fullscreen_exits + 1 }));
        warn();
      }
    };
    // Warn candidate that leaving/refreshing the page will end their attempt.
    // The screening is one-attempt-per-email, so a refresh cannot resume — we
    // block it with the browser's native "leave site?" dialog.
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", onBlur);
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [step]);

  // Timer
  useEffect(() => {
    if (step !== "test") return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          handleSubmit(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Cleanup on unmount
  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const timeStr = useMemo(() => {
    const m = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const s = (secondsLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  const validateForm = () => {
    for (const [k, v] of Object.entries(form)) {
      if (!String(v).trim()) return `Please fill: ${k.replace(/_/g, " ")}`;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    if (Object.keys(answers).length < questions.length) return `Please answer all ${questions.length} MCQ questions.`;
    return null;
  };

  const handleResumeUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("CV must be under 5 MB.");
      return;
    }
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }
    setResumeUploading(true);
    try {
      const ext = file.name.split(".").pop() || "pdf";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("screening-resumes")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      // Store a stable reference — admins generate signed URLs on view.
      const publicRef = `screening-resumes/${path}`;
      setResumeFile(file);
      setResumeUrl(publicRef);
      toast.success("CV uploaded.");
    } catch (e: any) {
      console.error("CV upload failed:", e);
      toast.error("CV upload failed. You can continue without it.");
    } finally {
      setResumeUploading(false);
    }
  };

  const handleSubmit = async (auto = false) => {
    if (submittedRef.current) return;
    if (!auto) {
      const err = validateForm();
      if (err) { toast.error(err); return; }
    }
    submittedRef.current = true;
    setSubmitting(true);
    toast.info(auto ? "Time is up — submitting your test..." : "Submitting your test...");

    try {
      // 1) Stop recording, get blob
      const blob = await stopRecordingAndGetBlob();

      // 2) Submit answers/form to score & save
      const payload = {
        ...form,
        answers,
        tab_switches: violations.tab_switches,
        fullscreen_exits: violations.fullscreen_exits,
        window_blurs: violations.window_blurs,
        resume_url: resumeUrl,
      };
      const { data, error } = await supabase.functions.invoke("submit-screening", { body: payload });
      if (error || !data?.ok) {
        const msg = data?.error || error?.message || "Submission failed.";
        toast.error(msg);
        submittedRef.current = false;
        setSubmitting(false);
        return;
      }

      // 3) Show success immediately — upload video in the background so a slow
      //    or large upload never leaves the candidate stuck on "Submitting...".
      if (document.fullscreenElement) { try { await document.exitFullscreen(); } catch { /* ignore */ } }
      setStep("done");
      toast.success("Test submitted successfully.");

      (async () => {
        try {
          const filename = `${sanitizeFilename(form.candidate_name)}_${sanitizeFilename(form.phone)}_${todayStr()}.webm`;
          const fd = new FormData();
          fd.append("submission_id", data.submission_id);
          fd.append("filename", filename);
          fd.append("file", new File([blob], filename, { type: "video/webm" }));
          await supabase.functions.invoke("upload-screening-video", { body: fd });
        } catch (e) {
          console.warn("Video upload failed:", e);
        } finally {
          streamRef.current?.getTracks().forEach((t) => t.stop());
        }
      })();
    } catch (e) {
      console.error(e);
      toast.error("Submission failed. Please try again.");
      submittedRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  // -------- Render --------
  if (step === "done") {
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Screening submitted — uConnect Technologies" description="Screening test submitted." path="/careers/screening/l2-network-engineer" />
        <Header />
        <main className="container mx-auto px-4 py-24 max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: BRAND }}>
                <Circle className="w-7 h-7 text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: BRAND }}>Thank you!</h1>
              <p className="text-muted-foreground">
                Your test has been submitted successfully. Our HR team will review your application and get back to you.
              </p>
              <Button onClick={() => navigate("/careers")} style={{ background: BRAND }}>Back to Careers</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (step === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="L2 Network Engineer Screening Test — uConnect Technologies"
          description="Online screening test for L2 Network Engineer role. 30 minutes, camera required."
          path="/careers/screening/l2-network-engineer"
        />
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl" style={{ color: BRAND }}>
                L2 Network Engineer — Online Screening Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md p-4 border" style={{ borderColor: BRAND, background: "#f5f9ff" }}>
                <p className="font-semibold mb-2" style={{ color: BRAND }}>Duration: 30 minutes</p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-foreground">
                  <li>Your camera must stay ON for the entire test.</li>
                  <li>Do NOT switch tabs or applications during the test.</li>
                  <li>Do NOT exit fullscreen. Violations are recorded.</li>
                  <li>The webcam recording is uploaded when you submit.</li>
                  <li>One attempt only per email/phone.</li>
                </ul>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-5 h-5" style={{ color: BRAND }} />
                  <span className="font-medium">Camera preview</span>
                </div>
                {cameraReady ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-sm rounded bg-black aspect-video" />
                ) : (
                  <div className="w-full max-w-sm aspect-video rounded bg-muted flex items-center justify-center text-sm text-muted-foreground">
                    Camera not started
                  </div>
                )}
                {cameraError && (
                  <p className="mt-3 text-sm text-destructive flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" /> {cameraError}
                  </p>
                )}
                {!cameraReady && !cameraError && (
                  <Button className="mt-4" onClick={requestCamera} style={{ background: BRAND }}>
                    Enable Camera & Microphone
                  </Button>
                )}
              </div>

              <div className="flex justify-end">
                <Button size="lg" disabled={!cameraReady} onClick={beginTest} style={{ background: BRAND }}>
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // ---- Test step ----
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Screening in progress" description="L2 screening test in progress." path="/careers/screening/l2-network-engineer" />
      {/* Pinned camera + REC + timer */}
      <div className="fixed top-3 right-3 z-50 bg-black/80 text-white rounded-md p-2 shadow-lg w-52">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC</span>
          <span className="font-mono">{timeStr}</span>
        </div>
        <video ref={smallVideoRef} autoPlay playsInline muted className="w-full aspect-video rounded bg-black" />
      </div>

      {cameraLost && (
        <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardContent className="py-8 text-center space-y-4">
              <AlertCircle className="w-10 h-10 mx-auto text-destructive" />
              <h2 className="text-xl font-semibold">Camera disconnected</h2>
              <p className="text-sm text-muted-foreground">
                Your camera stream ended. Please restore camera access to continue the test.
              </p>
              <Button onClick={async () => { await requestCamera(); if (streamRef.current) { setCameraLost(false); startRecording(); } }} style={{ background: BRAND }}>
                Reconnect Camera
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-4xl pr-4 lg:pr-64">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: BRAND }}>L2 Network Engineer — Screening Test</h1>
          <Progress value={((TEST_MINUTES * 60 - secondsLeft) / (TEST_MINUTES * 60)) * 100} className="mt-2" />
        </div>

        {/* Basic details */}
        <Card className="mb-6">
          <CardHeader><CardTitle style={{ color: BRAND }}>Basic Details</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {[
              ["candidate_name", "Full Name"],
              ["email", "Email"],
              ["phone", "Phone Number"],
              ["current_location", "Current Location"],
              ["qualification", "Highest Qualification"],
              ["total_experience", "Total Experience (years)"],
              ["relevant_experience", "Relevant Networking Experience (years)"],
              ["current_company", "Current Company"],
              ["current_designation", "Current Designation"],
            ].map(([key, label]) => (
              <div key={key}>
                <Label htmlFor={key}>{label} *</Label>
                <Input
                  id={key}
                  value={form[key as keyof FormState]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  maxLength={key === "email" ? 254 : 160}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mandatory screening */}
        <Card className="mb-6">
          <CardHeader><CardTitle style={{ color: BRAND }}>Mandatory Screening</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {[
              { key: "owns_laptop", label: "Do you own a personal laptop?", opts: ["Yes", "No"] },
              { key: "comfortable_manesar", label: "Comfortable working from Airtel NOC, Manesar?", opts: ["Yes", "No"] },
              { key: "comfortable_shifts", label: "Comfortable with 24x7 rotational shifts?", opts: ["Yes", "No"] },
              { key: "joining_availability", label: "Joining Availability", opts: ["Immediate", "Within 15 Days", "30 Days", "More than 30 Days"] },
            ].map(({ key, label, opts }) => (
              <div key={key}>
                <Label>{label} *</Label>
                <Select value={form[key as keyof FormState]} onValueChange={(v) => setForm({ ...form, [key]: v })}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* MCQ */}
        <Card className="mb-6">
          <CardHeader><CardTitle style={{ color: BRAND }}>Technical MCQ ({L2_SCREENING_QUESTIONS.length} questions)</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="border-b pb-4 last:border-b-0">
                <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
                <RadioGroup
                  value={answers[q.id] !== undefined ? String(answers[q.id]) : ""}
                  onValueChange={(v) => setAnswers({ ...answers, [q.id]: Number(v) })}
                >
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <RadioGroupItem id={`q${q.id}_${i}`} value={String(i)} />
                      <Label htmlFor={`q${q.id}_${i}`} className="font-normal cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Commercial */}
        <Card className="mb-6">
          <CardHeader><CardTitle style={{ color: BRAND }}>Commercial</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current_ctc">Current CTC / Monthly Salary *</Label>
              <Input id="current_ctc" value={form.current_ctc} onChange={(e) => setForm({ ...form, current_ctc: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="expected_ctc">Expected CTC / Monthly Salary *</Label>
              <Input id="expected_ctc" value={form.expected_ctc} onChange={(e) => setForm({ ...form, expected_ctc: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Are you comfortable with total monthly CTC of Rs. 25,000? *</Label>
              <Select value={form.comfortable_25k} onValueChange={(v) => setForm({ ...form, comfortable_25k: v })}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pb-16">
          <Button size="lg" disabled={submitting} onClick={() => handleSubmit(false)} style={{ background: BRAND }}>
            {submitting ? "Submitting..." : "Submit Test"}
          </Button>
        </div>
      </main>
    </div>
  );
}
