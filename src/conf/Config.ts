import { GlobalConfig } from 'protontype';

export interface SpecificConfig extends GlobalConfig {
    jwtSecret?: string;
    jwtSession?: { session: boolean };
}