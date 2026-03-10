import jira from "../../jira.app.mjs";

export default {
  key: "jira-move-issues-to-sprint",
  name: "Move Issues to Sprint",
  description: "Moves issues to a sprint, for a given sprint ID. [See the documentation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-rest-agile-1-0-sprint-sprintid-issue-post)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: true,
    readOnlyHint: false,
  },
  props: {
    jira,
    cloudId: {
      propDefinition: [
        jira,
        "cloudId",
      ],
    },
    boardId: {
      propDefinition: [
        jira,
        "boardId",
        (c) => ({
          cloudId: c.cloudId,
        }),
      ],
    },
    sprintId: {
      propDefinition: [
        jira,
        "sprintId",
        (c) => ({
          cloudId: c.cloudId,
          boardId: c.boardId,
        }),
      ],
    },
    issues: {
      type: "string[]",
      label: "Issues",
      description: "The IDs or keys of the issues to move to the sprint.",
    },
  },
  async run({ $ }) {
    const response = await this.jira.moveIssuesToSprint({
      $,
      cloudId: this.cloudId,
      sprintId: this.sprintId,
      data: {
        issues: this.issues,
      },
    });
    const count = this.issues?.length ?? 0;
    $.export("$summary", `Successfully moved ${count} issue${count !== 1
      ? "s"
      : ""} to sprint ${this.sprintId}`);
    return response;
  },
};
