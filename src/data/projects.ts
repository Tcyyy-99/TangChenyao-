// Define a shared data structure to ensure media links are always synced
import { VIDEOGRAPHY_DATA } from './videography';
import { DESIGN_DATA } from './design';
import { DEV_DATA } from './dev';
import { PHOTOGRAPHY_PROJECTS } from './photography_projects';
import { INTERACTION_DATA } from './interaction';
import { PRODUCT_DATA } from './product';
import { OTHERS_DATA } from './others';

export const PROJECT_DATA = [
  ...INTERACTION_DATA,
  ...PRODUCT_DATA,
  ...OTHERS_DATA,
  ...PHOTOGRAPHY_PROJECTS,
  ...VIDEOGRAPHY_DATA,
  ...DESIGN_DATA,
  ...DEV_DATA
];
