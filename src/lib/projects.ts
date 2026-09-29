import type { Project } from "@arno/assets/site"

/** Short project name: "HMS App – Marvellous Machines" becomes "HMS App". */
export const shortTitle = (title: string) => title.split(" – ")[0]

/** Stable anchor id for a project, for example "project-hms-app". */
export const projectId = (project: Pick<Project, "title">) =>
  `project-${shortTitle(project.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`
