import ContentSlider from "./ContentSlider";

export default function FacilitatorSlider({ items }: {
  items: { name: string; avatar: string }[];
}) {
  return (
    <ContentSlider label="Facilitators" itemLabel="Facilitator page" gallery items={items.map((person, i) => ({
      id: `${person.avatar}-${i}`,
      content: (
        <div className="fe-person">
          <span className="fe-person__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={person.avatar} alt="" width={112} height={112} />
          </span>
          <div>
            <p className="fe-person__name">{person.name}</p>
          </div>
        </div>
      ),
    }))} />
  );
}
