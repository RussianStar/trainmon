import { HeartRate } from "./HeartRate";
import { Overview } from "./overview";


export interface Result {
    Overview?: Overview;
    HeartRate?: HeartRate;
}
