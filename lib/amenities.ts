import type { IconType } from "react-icons";
import {
  BsCupHot,
  BsDroplet,
  BsFire,
  BsTv,
  BsUiRadios,
  BsWind,
} from "react-icons/bs";
import { LuMicrowave, LuRefrigerator } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import type { Amenity } from "@/types/camper";

export const amenities: Record<Amenity, { label: string; icon: IconType }> = {
  ac: { label: "AC", icon: BsWind },
  kitchen: { label: "Kitchen", icon: BsCupHot },
  tv: { label: "TV", icon: BsTv },
  radio: { label: "Radio", icon: BsUiRadios },
  gas: { label: "Gas", icon: BsFire },
  water: { label: "Water", icon: BsDroplet },
  bathroom: { label: "Bathroom", icon: PiShower },
  refrigerator: { label: "Refrigerator", icon: LuRefrigerator },
  microwave: { label: "Microwave", icon: LuMicrowave },
};
