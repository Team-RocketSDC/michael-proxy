import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '10s',
  rps: 1000,
};

export default function () {
  http.get('http://localhost:2001/9800000');
  sleep(1);
};
