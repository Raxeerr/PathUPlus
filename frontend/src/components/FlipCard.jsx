import { useState } from "react";

export default function FlipCard({
  card,
  onSelect
}) {

  const [flipped, setFlipped] =
    useState(false);

  const handleClick = () => {

    if (flipped) return;

    setFlipped(true);

    onSelect(card);

  };

  return (

    <div
      onClick={handleClick}
      className="
      cursor-pointer
      h-72
      perspective-[1000px]
      "
    >

      <div
        className={`
        relative
        w-full
        h-full
        duration-700
        [transform-style:preserve-3d]
        ${
          flipped
            ? "[transform:rotateY(180deg)]"
            : ""
        }
        `}
      >

        <div
          className="
          absolute
          inset-0
          rounded-3xl
          bg-gradient-to-br
          from-violet-700
          to-fuchsia-600
          flex
          items-center
          justify-center
          p-6
          text-center
          text-white
          text-lg
          [backface-visibility:hidden]
          "
        >

          {card.text}

        </div>

        <div
          className={`
          absolute
          inset-0
          rounded-3xl
          flex
          flex-col
          justify-center
          items-center
          p-6
          text-center
          text-white
          [transform:rotateY(180deg)]
          [backface-visibility:hidden]
          ${
            card.correct
              ? "bg-green-600"
              : "bg-red-600"
          }
          `}
        >

          <h3 className="text-3xl mb-4">

            {
              card.correct
                ? "😊 Correcto"
                : "😟 Mejorable"
            }

          </h3>

          <p>

            {card.feedback}

          </p>

        </div>

      </div>

    </div>

  );

}