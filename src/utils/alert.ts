// utils/alert.ts
import Swal from "sweetalert2";

export const showSuccess = (title: string, text?: string) =>
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#2960EC",
  });

export const showError = (title: string, text?: string) =>
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#2960EC",
  });