"use client";
import WordRowPreview from "./word-row-preview";

type PhonePreviewProps = {
  selectedWordsList: Word[];
  imageRef?: React.RefObject<HTMLDivElement>;
};

const PhonePreview: React.FC<PhonePreviewProps> = ({
  selectedWordsList,
  imageRef,
}) => {
  const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const lightGlassmorphism = {
    /* From https://css.glass */
    background: "rgba(255, 255, 255, 0.81)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const darkGlassmorphism = {
    background: "rgba(23, 38, 50, 0.9)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(20px)",
  };

  const glassmorphism = darkMode ? darkGlassmorphism : lightGlassmorphism;

  return (
    <div className="mockup-phone" style={{ height: "700px" }}>
      <div className="camera"></div>
      <div className="display h-full">
        <div
          style={{ height: "100%" }}
          className="artboard artboard-demo phone-1 relative"
        >
          <div className="absolute h-full w-full" ref={imageRef}>
            <img className="absolute" src="/ios-light.png" alt="" />
            <div className="px-1.5">
              <div
                style={{ ...glassmorphism, top: "250px" }}
                className="card w-full bg-base-100 shadow-xl"
              >
                <ul className="w-full divide-y divide-gray-100 rounded-box px-2">
                  {selectedWordsList.map((dictionary, index) => (
                    <li
                      key={index}
                      style={{ paddingBottom: "0.8rem" }}
                      className="flex justify-between"
                    >
                      <WordRowPreview
                        word={dictionary.name}
                        definition={dictionary.definition}
                        key={index}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="phone-ui absolute h-full w-full">
            <div
              style={{ paddingTop: "70px" }}
              className="status-bar text-center text-white"
            >
              {/* date */}
              <div className="date font-semibold">Tuesday, 20 February</div>

              {/* clock */}
              <div className="clock text-7xl font-semibold">
                <div className="time">10:40</div>
              </div>
            </div>
            {/* notifications */}
            <div
              style={{ bottom: "80px" }}
              className="notifications absolute h-16 w-full px-1.5"
            >
              <div
                style={{...glassmorphism}}
                className="notification h-full rounded-box"
              ></div>
            </div>
            {/* camera and flashlight buttons */}
            <div
              style={{ bottom: "20px" }}
              className="camera-flashlight absolute flex w-full justify-around gap-4"
            >
              <div
                style={{...glassmorphism}}
                className="camera-btn h-11 w-11 rounded-full"
              ></div>
              <div
                style={{...glassmorphism}}
                className="flashlight-btn h-11 w-11 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
