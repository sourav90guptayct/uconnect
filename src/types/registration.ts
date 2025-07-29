export interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  currentCity: string;
  homeLocation: string;
  totalExperience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  profileSummary: string;
  resumeUrl: string;
  maritalStatus: string;
  familyDetails: string;
  caste: string;
  disabilityStatus: string;
  profilePictureUrl: string;
  industry: string;
}

export interface EducationData {
  educationLevel: string;
  courseName: string;
  specialization: string;
  instituteName: string;
  yearOfPassing: string;
  percentage: string;
}

export interface SkillData {
  skillName: string;
  proficiencyLevel: number;
  yearsOfExperience: string;
}

export interface ExperienceData {
  companyName: string;
  designation: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  salary: string;
  jobDescription: string;
  location: string;
}