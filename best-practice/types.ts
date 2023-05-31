export interface IBestPractice {
  /**
   * The name of the best practice. Should be short.
   */
  name: string;

  /**
   * The team responsible for monitoring, and communicating this best practice.
   *
   * This field supports Markdown notation, allowing you to, for example, link to a team's GitHub page.
   */
  owner: string;

  /**
   * A description of the best practice, explaining why it's important.
   *
   * This field supports Markdown notation.
   */
  description: string;

  /**
   * How to check if the best practice is being followed.
   *
   * For example, a link to a dashboard, or a command to run.
   */
  howToCheck: string;

  /**
   * How to exempt from the best practice.
   */
  howToExempt: string;
}

/**
 * A list of best practices, grouped by section.
 * The section will be used as a heading in the Markdown file.
 */
export type IAllBestPractice = Record<string, readonly IBestPractice[]>;
