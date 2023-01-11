export interface ResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface TableHeader {
  label: string;
  key: string;
}

export interface Overview {
  parameterName: string;
  parameterDisplay: string;
  parameterValue: string;
  parameterExplain: string;
}
