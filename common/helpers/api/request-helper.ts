import { test } from "@playwright/test";
import { APIRequestContext } from "playwright";
import { APILogger } from "./api-logger-helper";

export class RequestHandler {
  private baseUrl?: string;
  private apiPath: string = "";
  private queryParams: Record<string, string> = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};
  private clearAuthFlag: boolean = false;

  constructor(
    private request: APIRequestContext,
    private defaultBaseUrl: string,
    private logger: APILogger,
    private authToken: string = ""
  ) {}

  url(url: string) {
    this.baseUrl = url;
    return this;
  }

  path(path: string) {
    this.apiPath = path;
    return this;
  }

  params(params: object) {
    this.queryParams = params as Record<string, string>;
    return this;
  }

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  clearAuth() {
    this.clearAuthFlag = true;
    return this;
  }

  async getRequest(statusCode: number) {
    const url = this.getUrl();
    return await test.step(`GET request to ${url}`, async () => {
      this.logger.logRequest("GET", url, this.getHeaders(), this.apiBody);
      const response = await this.request.get(url, {
        headers: this.getHeaders(),
      });
      this.cleanUpFields();

      const actualStastus = response.status();
      const data = await response.json();
      this.logger.logResponse(actualStastus, data);

      this.statusCodeVlidator(actualStastus, statusCode, this.getRequest);
      return data;
    });
  }

  async postRequest(statusCode: number) {
    const url = this.getUrl();
    return await test.step(`POST request to ${url}`, async () => {
      this.logger.logRequest("POST", url, this.getHeaders(), this.apiBody);
      const response = await this.request.post(url, {
        headers: this.getHeaders(),
        data: this.apiBody,
      });
      this.cleanUpFields();

      const actualStastus = response.status();
      const data = await response.json();
      this.logger.logResponse(actualStastus, data);

      this.statusCodeVlidator(actualStastus, statusCode, this.postRequest);
      return data;
    });
  }

  async putRequest(statusCode: number) {
    const url = this.getUrl();
    return await test.step(`GET request to ${url}`, async () => {
      this.logger.logRequest("PUT", url, this.getHeaders(), this.apiBody);
      const response = await this.request.put(url, {
        headers: this.getHeaders(),
        data: this.apiBody,
      });
      this.cleanUpFields();

      const actualStastus = response.status();
      const data = await response.json();
      this.logger.logResponse(actualStastus, data);

      this.statusCodeVlidator(actualStastus, statusCode, this.putRequest);
      return data;
    });
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();
    return await test.step(`GET request to ${url}`, async () => {
      this.logger.logRequest("DELETE", url, this.getHeaders(), this.apiBody);
      const response = await this.request.delete(url, {
        headers: this.getHeaders(),
      });
      this.cleanUpFields();

      const actualStastus = response.status();
      this.logger.logResponse(actualStastus);

      this.statusCodeVlidator(actualStastus, statusCode, this.deleteRequest);
    });
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`);
    const urlParams = new URLSearchParams(Object.entries(this.queryParams));
    url.search = urlParams.toString();
    return url.toString();
  }

  private statusCodeVlidator(actual: number, expected: number, callingMethod: Function) {
    if (actual !== expected) {
      const logs = this.logger.getRecentLogs();
      const error = new Error(
        `Expected status ${expected}, but got ${actual}\n\nRecent API Activity:\n${logs}`
      );
      Error.captureStackTrace(error, callingMethod);
      throw error;
    }
  }

  private cleanUpFields() {
    this.apiPath = "";
    this.apiBody = {};
    this.baseUrl = undefined;
    this.queryParams = {};
    this.clearAuthFlag = false;
  }

  private getHeaders() {
    if (!this.clearAuthFlag)
      this.apiHeaders["Authorization"] = this.apiHeaders["Authorization"] || this.authToken;
    return this.apiHeaders;
  }
}
