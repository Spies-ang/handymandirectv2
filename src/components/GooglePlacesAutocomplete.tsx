import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface GooglePlacesAutocompleteProps {
  value: string;
  onPlaceSelect: (address: string) => void;
  placeholder?: string;
  className?: string;
}

declare global {
  interface Window {
    google?: any;
    initGooglePlaces?: () => void;
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const GooglePlacesAutocomplete = ({
  value,
  onPlaceSelect,
  placeholder = "Start typing an address...",
  className,
}: GooglePlacesAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(!!value);
  const [loaded, setLoaded] = useState(!!window.google?.maps?.places);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.places) {
      setLoaded(true);
      return;
    }
    if (!GOOGLE_MAPS_API_KEY) return;

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) return;

    window.initGooglePlaces = () => setLoaded(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.initGooglePlaces;
    };
  }, []);

  // Init autocomplete
  useEffect(() => {
    if (!loaded || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "za" },
      types: ["address"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        setInputValue(place.formatted_address);
        onPlaceSelect(place.formatted_address);
        setIsValid(true);
      }
    });
  }, [loaded, onPlaceSelect]);

  useEffect(() => {
    setInputValue(value);
    setIsValid(!!value);
  }, [value]);

  if (!GOOGLE_MAPS_API_KEY) {
    // Fallback to regular input if no API key
    return (
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onPlaceSelect(e.target.value);
        }}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <div className="space-y-1">
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsValid(false);
          onPlaceSelect(""); // Clear until a place is selected
        }}
        placeholder={placeholder}
        className={className}
      />
      {inputValue && !isValid && (
        <p className="text-xs text-destructive">Please select an address from the dropdown.</p>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
