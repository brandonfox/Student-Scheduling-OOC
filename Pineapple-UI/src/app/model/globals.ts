import {Injectable} from '@angular/core';
import {isDevMode} from '@angular/core';

@Injectable()
export class Globals {
    public ip: string;
    dev: boolean;
    constructor(
    ) {
        this.dev = isDevMode();
        if (this.dev.valueOf()) {
            this.ip = 'http://localhost';
        } else {
            this.ip = window.location.origin;
        }
    }
}
