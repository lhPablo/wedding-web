import type { SectionType } from "src/types/sectionTypes";
import type { IconType } from "src/types/iconTypes";

export interface Section {
    icon: IconType;
    data: any;
    type: SectionType;
}