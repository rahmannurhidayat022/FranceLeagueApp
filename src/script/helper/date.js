const getDate = (value, format = "DD MMMM YYYY") => {
  if (!value) return "-";
  const date = new Date(value);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  if (format.includes("YYYY-MM-DD")) {
    const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
    return `${year}-${month}-${day}`;
  } else {
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    return `${day} ${month} ${year}`;
  }
};

export default getDate;
