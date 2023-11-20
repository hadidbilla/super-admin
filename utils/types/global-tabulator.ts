export interface tableHeadItems {
  label: string;
  field: string;
  center?: boolean;
  loadingImage?: boolean;
  loadingOnlyTitle?: boolean;
  bulkSelected?: boolean;

  options?: {
      checkbox?: boolean;
      hideDelete?: boolean;
      editableFields?: boolean;
      showEdit?: boolean;
      showView?: boolean;
  } | any;
}