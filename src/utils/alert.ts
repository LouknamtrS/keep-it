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


export const showConfirmDelete = () => {
    return Swal.fire({
        title: "ยืนยันการลบบัญชี",
        text: "บัญชีของคุณจะถูกลบอย่างถาวรและไม่สามารถกู้คืนได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ลบบัญชี",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
        confirmButtonColor: "#dc2626",
    });
};