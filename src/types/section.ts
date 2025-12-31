import type { SectionType } from "src/types/sectionTypes";
import type { MenuIconType } from "src/types/menuIconTypes";

export interface Section {
    icon: MenuIconType;
    data: any;
    type: SectionType;
}