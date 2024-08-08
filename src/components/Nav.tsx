export default function Nav() {
  return (
    <nav
      className={`padding-primary-x bg-primary-dark grid h-[5rem] gap-4 py-4 max600px:grid-cols-[1fr_9rem] min600px:grid-cols-[1fr_9rem_10vw] min1000px:grid-cols-[1fr_9rem_27.5vw]`}
    >
      <input
        className='rounded-sm px-6 outline-none placeholder:italic hover:ring'
        placeholder='Введите поисковый запрос'
      />

      <button className='bg-primary rounded-sm font-medium text-white shadow-md duration-primary hover:bg-blue-400'>
        ИСКАТЬ
      </button>
    </nav>
  );
}
