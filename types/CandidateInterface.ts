export interface CandidateInterface {
  id: string
  name: string
  email: string
  phone: string
  address: string
  bio: string
}

export interface CandidateDataInterface extends CandidateInterface {
  data: CandidateData
}

export interface CandidateData {
  data: CandidateCompleteData
  user_data: UserData
}

export interface CandidateCompleteData {
  id: string
  company_id: string
  job_title: string
  recruiter_entity_id: string
  experience_level: string
  status: string
  created_at: string
  updated_at: string
  deleted_at: any
  companyId: string
  skillset: Skillset[]
  candidate_submissions: CandidateSubmission[]
}

export interface Skillset {
  id: string
  name: string
  skills: Skill[]
  skillset_group: SkillsetGroup
  skill_requirement_skillset: SkillRequirementSkillset
}

export interface Skill {
  id: string
  name: string
  pos: Po[]
}

export interface Po {
  id: string
  consensus_score: number
  sVs: SV[]
}

export interface SV {
  id: string
  user: User
  company?: Company2
  cred: Cred
  proof_of_skill_skill_validator: ProofOfSkillSkillValidator
}

export interface User {
  profile_with_signed_url: ProfileWithSignedUrl
  id: string
  profile: Profile
  workEx: WorkEx[]
}

export interface ProfileWithSignedUrl {
  education: Education[]
  current_position_title: string
  work_experience?: WorkExperience[]
  projects: Project[]
  linkedin?: string
}

export interface Education {
  id: string
  institution_name: string
  field_of_study: string
  education_type: string
  start_date: string
  end_date: string
  still_studying: boolean
  institution_logo: string
  institution_logo_signed_url: string
}

export interface WorkExperience {
  created_at: string
  updated_at: string
  id: string
  user_id: string
  company_id: string
  position_in_company: string
  company_ref: any[]
  start_date: string
  end_date: string
  deleted_at: any
  companyId: string
}

export interface Project {
  title: string
  link: string
  id: string
  thumbnail_path: string
  thumbnail_path_signed_url: string
}

export interface Profile {
  education: Education2[]
  current_position_title: string
  work_experience?: WorkExperience2[]
  projects: Project2[]
  linkedin?: string
}

export interface Education2 {
  id: string
  institution_name: string
  field_of_study: string
  education_type: string
  start_date: string
  end_date: string
  still_studying: boolean
  institution_logo: string
}

export interface WorkExperience2 {
  created_at: string
  updated_at: string
  id: string
  user_id: string
  company_id: string
  position_in_company: string
  company_ref: any[]
  start_date: string
  end_date: string
  deleted_at: any
  companyId: string
}

export interface Project2 {
  title: string
  link: string
  id: string
  thumbnail_path: string
}

export interface WorkEx {
  id: string
  start_date: string
  end_date: string
  company: Company
}

export interface Company {
  company_logo_signed_url: string
  id: string
  name: string
  company_logo: string
}

export interface Company2 {
  company_logo_signed_url: string
  id: string
  name: string
  company_logo: string
}

export interface Cred {
  consensus_score: number
  id: string
  total_normalised_deviation: string
  total_max_normalised_deviation: string
}

export interface ProofOfSkillSkillValidator {
  id: string
}

export interface SkillsetGroup {
  id: string
  grouping_name: string
}

export interface SkillRequirementSkillset {
  id: string
}

export interface CandidateSubmission {
  id: string
}

export interface UserData {
  user_id: string
  user: User2
}

export interface User2 {
  profile_with_signed_url: ProfileWithSignedUrl2
  id: string
  name: string
  profile: Profile2
  workEx: WorkEx2[]
}

export interface ProfileWithSignedUrl2 {
  education: Education3[]
  current_position_title: string
  work_experience: WorkExperience3[]
  projects: Project3[]
}

export interface Education3 {
  id: string
  institution_name: string
  field_of_study: string
  education_type: string
  start_date: string
  end_date: string
  still_studying: boolean
  institution_logo: string
  institution_logo_signed_url: string
}

export interface WorkExperience3 {
  created_at: string
  updated_at: string
  id: string
  user_id: string
  company_id: string
  position_in_company: string
  company_ref: any[]
  start_date: string
  end_date: string
  deleted_at: any
  companyId: string
}

export interface Project3 {
  title: string
  link: string
  id: string
  thumbnail_path: string
  thumbnail_path_signed_url: string
}

export interface Profile2 {
  education: Education4[]
  current_position_title: string
  work_experience: WorkExperience4[]
  projects: Project4[]
}

export interface Education4 {
  id: string
  institution_name: string
  field_of_study: string
  education_type: string
  start_date: string
  end_date: string
  still_studying: boolean
  institution_logo: string
}

export interface WorkExperience4 {
  created_at: string
  updated_at: string
  id: string
  user_id: string
  company_id: string
  position_in_company: string
  company_ref: any[]
  start_date: string
  end_date: string
  deleted_at: any
  companyId: string
}

export interface Project4 {
  title: string
  link: string
  id: string
  thumbnail_path: string
}

export interface WorkEx2 {
  id: string
  start_date: string
  end_date: string
  company_ref: any[]
  company: Company3
}

export interface Company3 {
  company_logo_signed_url: string
  id: string
  name: string
  company_logo: string
}
