// Represents an ISO format date string, e.g., "2023-08-22T10:20:30.456Z"
type ISODateString = string;

export type TodoType = {
    id: string;  // Unique identifier for the Todo
    name: string;  // Short name or title of the Todo
    content: string;  // Detailed content or description
    created_at: ISODateString;  // Date when the Todo was created
    updated_at: ISODateString;  // Date when the Todo was last updated
    deleted_at: null | ISODateString;  // Date when the Todo was deleted, or null if not deleted
};