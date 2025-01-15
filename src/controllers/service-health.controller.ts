import { Request, Response } from 'express';

export default function serviceHealth(request: Request, response: Response) {
  response.render('main', { layout: 'index', title: 'Service Reporter' })
}
