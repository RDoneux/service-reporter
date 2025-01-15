import debug from 'debug';
import {name} from '../../package.json';

export function debugInit() {
    debug.enable(`${name}:*`);
}

export const DebugNamespace = {
    STARTUP: `${name}:startup`,
    REQUEST: `${name}:request`
} as const;
export type DebugNamespace = (typeof DebugNamespace)[keyof typeof DebugNamespace];

export function debugFactory(namespace: DebugNamespace) {
    return debug(namespace);
}