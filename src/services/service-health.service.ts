import axios, { AxiosResponse } from 'axios';

interface Health {
  status: number;
}

export interface JenkinsHealth extends Health {
  jobs: { name: string }[];
  numExecutors: number;
}

export async function getJenkinsHealth(): Promise<JenkinsHealth> {
  const response: AxiosResponse = await axios.get(
    'http://192.168.0.106:8080/api/json',
    {
      auth: {
        username: 'RDoneux',
        password: '11c5ef8537ea656250e0c10eae7ce94912',
      },
    }
  );
  const { jobs, numExecutors } = response.data;
  return { status: response.status, jobs, numExecutors };
}
