export const getThaiMonthName = (month: number) => {
    const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
    ];
    return thaiMonths[month - 1];
};

export const getNextMonth = (month: number, year: number) => {
    if (month === 12) {
        return { month: 1, year: year + 1 };
    }
    return { month: month + 1, year };
};

export const getPrevMonth = (month: number, year: number) => {
    if (month === 1) {
        return { month: 12, year: year - 1 };
    }
    return { month: month - 1, year };
};