import { NextFunction, Request, Response } from "express";
import { debugFactory, DebugNamespace } from "./debug";

const debug = debugFactory(DebugNamespace.REQUEST);

export default function logger (request: Request, response: Response, next: NextFunction) {
    debug(`${request.method} ${request.path}`);
    next();
}