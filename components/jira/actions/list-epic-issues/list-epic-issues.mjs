import jira from "../../jira.app.mjs";

export default {
  key: "jira-list-epic-issues",
  name: "List Epic Issues",
  description: "Returns all issues that belong to an epic on the given board. [See the documentation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-rest-agile-1-0-board-boardid-epic-epicid-issue-get)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    readOnlyHint: true,
    openWorldHint: true,
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
    epicId: {
      type: "string",
      label: "Epic ID",
      description: "The ID of the epic.",
    },
    startAt: {
      type: "integer",
      label: "Start At",
      description: "The starting index of the returned issues. Base index: 0.",
      optional: true,
    },
    maxResults: {
      type: "integer",
      label: "Max Results",
      description: "The maximum number of issues to return.",
      optional: true,
    },
    jql: {
      type: "string",
      label: "JQL",
      description: "Filters results using a JQL query.",
      optional: true,
    },
    fields: {
      type: "string",
      label: "Fields",
      description: "A list of fields to return for each issue. Accepts a comma-separated list.",
      optional: true,
    },
    expand: {
      propDefinition: [
        jira,
        "expand",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.jira.listEpicIssues({
      $,
      cloudId: this.cloudId,
      boardId: this.boardId,
      epicId: this.epicId,
      params: {
        startAt: this.startAt,
        maxResults: this.maxResults,
        jql: this.jql,
        fields: this.fields,
        expand: this.expand,
      },
    });
    const count = response?.issues?.length ?? 0;
    $.export("$summary", `Successfully retrieved ${count} issue${count !== 1
      ? "s"
      : ""} from epic ${this.epicId}`);
    return response;
  },
};
