type Props = {
  title: string;
  body?: string;
  children?: React.ReactNode;
};

export const Card: React.FC<Props> = ({ title, body }) => {
  return (
    <div className="card w-full card-bordered">
      <div className="card-body p-5">
        <p className="card-title line-clamp-2">{title}</p>
        <p className="prose line-clamp-3 text-gray-500">{body}</p>
        <p></p>

        <div className="card-actions">
          <button className="btn">Generate tweet</button>
        </div>
      </div>
    </div>
  );
};
