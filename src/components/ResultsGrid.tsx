type ResultsGridProps = {
  name: string;
  language: string;
  forkCount: number | string;
  starCount: number | string;
  updateDate: string;
  className?: string;
  onClick?: () => void;
};

export default function ResultsGrid({
  name,
  language,
  forkCount,
  starCount,
  updateDate,
  className,
  onClick,
}: ResultsGridProps) {
  return (
    <div className={`${className} grid grid-cols-5 items-center gap-4 border-b p-2`} onClick={onClick}>
      <h3 className='overflow-hidden'>{name}</h3>
      <h3 className='overflow-hidden'>{language}</h3>
      <h3 className='overflow-hidden'>{forkCount}</h3>
      <h3 className='overflow-hidden'>{starCount}</h3>
      <h3 className='overflow-hidden'>{updateDate}</h3>
    </div>
  );
}
