export const BASE_URL = "https://todo.api.devcode.gethired.id";

export const priorityOptions = [
    {
      label: "Very High",
      value: "very-high",
      icon: <div className='option-icon red'></div>
    },
    {
      label: "High",
      value: "high",
      icon: <div className='option-icon yellow'></div>
    },
    {
      label: "Normal",
      value: "normal",
      icon: <div className='option-icon green'></div>
    },
    {
      label: "Low",
      value: "low",
      icon: <div className='option-icon blue'></div>
    },
    {
      label: "Very Low",
      value: "very-low",
      icon: <div className='option-icon purple'></div>
    },
  ];

  export const sortOptions = [
    {
      label: "Terbaru",
      value: "sort-latest"
    },
    {
      label: "Terlama",
      value: "sort-oldest"
    },
    {
      label: "A-Z",
      value: "sort-az"
    },
    {
      label: "Z-A",
      value: "sort-za"
    },
    {
      label: "Belum Selesai",
      value: "sort-unfinished"
    },
  ]