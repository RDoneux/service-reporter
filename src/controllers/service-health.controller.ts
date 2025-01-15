import { Request, Response } from "express";

export default function serviceHealth(request: Request, response: Response) {
    response.json({
        status: 'OK'
    });
}