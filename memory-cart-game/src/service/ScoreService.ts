import type { ApiErrorResponse } from "../model/ApiErrorResponse";
import type { Score } from "../model/Score";


class ScoreService {

  private baseUrl: string = import.meta.env.VITE_SCIRE_HOST;

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: ApiErrorResponse | string;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw {
        status: response.status,
        message: 'API užklausa nepavyko',
        details: errorData
      };
    }
    if (response.status === 204) return {} as T;
    return response.json() as Promise<T>;
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  /**
   * Submit a new game score
   * Submits a player score for a specific mode. The database automatically generates the ID.
   */
  async setScore(score: Score): Promise<Score> {

    const csrfToken = this.getCookie("XSRF-TOKEN");

    const response = await fetch(`${this.baseUrl}/ratings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-XSRF-TOKEN": csrfToken || "",
      },
      body: JSON.stringify(score),
      credentials: "include",
    });
    return this.handleResponse<Score>(response);
  }

  /**
   * Get player's best score
   * Retrieves the highest recorded score for a specific player in a given game mode.
   */
  async bestUser(username: string, mode: string): Promise<Score|null> {
    const response = await fetch(
      `${this.baseUrl}/ratings/${encodeURIComponent(username)}/${encodeURIComponent(mode)}/best`,
      { method: 'GET', credentials: "include" },
    );
    
    return this.handleResponse<Score>(response).catch(err => {
        if (err?.status === 404) {
            return null;
        }
        throw err;
    });
  }

  /**
   * Get top 10 game mode scores
   * Retrieves the top 10 recorded scores.
   */
  async top10(mode: string): Promise<Score[]> {
    const response = await fetch(
      `${this.baseUrl}/ratings/${encodeURIComponent(mode)}/top-10`,
      { method: 'GET', credentials: "include" }
    );
    return this.handleResponse<Score[]>(response);
  }

  sec2points(time: number) : number {
    const maxPoints = 10000;
    const k = 0.05;

    return Math.round(maxPoints * Math.exp(-k * time)); 
  }
}

export const scoreService = new ScoreService();