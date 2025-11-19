// types
export type {
  BaseEducationLevel,
  CreateEducationLevel,
  FullEducationLevel,
  UpdateEducationLevel,
} from './education-level.schema';
export type {
  BaseTermsByEducationLevel,
  CreateTermsByEducationLevel,
  FullTermsByEducationLevel,
  UpdateTermsByEducationLevel,
} from './terms-by-education-level.schema';

// validations
export {
  baseEducationLevelSchema,
  createEducationLevelSchema,
  fullEducationLevelSchema,
  updateEducationLevelSchema,
} from './education-level.schema';
export {
  baseTermsByEducationLevelSchema,
  createTermsByEducationLevelSchema,
  fullTermsByEducationLevelSchema,
  updateTermsByEducationLevelSchema,
} from './terms-by-education-level.schema';
