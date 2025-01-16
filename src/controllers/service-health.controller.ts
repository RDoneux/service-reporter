import { Request, Response } from 'express';
import {
  getJenkinsHealth,
  JenkinsHealth,
} from '../services/service-health.service';

export default async function serviceHealth(
  request: Request,
  response: Response
) {
  const { status, jobs, numExecutors }: JenkinsHealth =
    await getJenkinsHealth();

  response.render('main', {
    layout: 'service-report',
    ...{ status, jobs, numExecutors },
  });
}
