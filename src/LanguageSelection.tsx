import { useEffect, useState } from "react";
import moment from "moment-timezone";

type LanguageProps = {
  languages: string[];
};

const LanguageSelection = ({ languages }: LanguageProps) => {
  const [timezone, setTimezone] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [time, setTime] = useState<string>();
  const [dateString, setDateString] = useState<string>("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (language) {
      const locale = new Intl.Locale(language);
      const region: string = locale?.region || "";
      if (!region) return;
      const countryName: string =
        new Intl.DisplayNames([language], {
          type: "region",
        }).of(region) || "";
      setCountry(countryName);

      if (region) {
        setTimezone(moment.tz.zonesForCountry(region) || []);
      }
    }
  }, [language]);

  useEffect(() => {
    if (time) {
      const formattedDate = new Intl.DateTimeFormat(language, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: time,
      })
        .format(new Date())
        .toString();
      setDateString(formattedDate);
    }
  }, [time]);

  return (
    <div className="bg-[#083f8f] !text-white rounded-xl p-4 px-12 text-center text-xl h-[800px] md:h-[400px] ">
      <h2 className="text-center text-2xl p-5 font-semibold py-8">
        Please Select Language and then time zone for getting specific time of
        selected time Zone.
      </h2>
      <div className="flex flex-col md:flex-row justify-between text-start space-x-4 self-center mt-4">
        <div className="lg:w-1/2">
          <label className="text-xl font-semibold">Select Language</label>
          <select
            className="bg-white text-black rounded w-full mt-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            defaultValue={""}
          >
            <option value="">Select Language</option>
            {languages.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        <div className="lg:w-1/2">
          <label className="text-xl font-semibold">Select Timezone</label>
          <select
            className="bg-white text-black rounded w-full mt-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            defaultValue={""}
          >
            <option value="">Select Timezone</option>
            {timezone.map((item: any, index: number) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between py-8 space-x-4 text-start font-semibold">
        {time && (
          <>
            <div className="w-1/2 ">
              <h3 className="text-xl">Timezone Date & Time :</h3>
              <h3 className="text-xl">Country :</h3>
            </div>
            <div className="w-1/2 ">
              <h3>{dateString}</h3>
              <h3>{country}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageSelection;
