import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native'
import tw from 'twrnc'

type Suggestion = {
  lat: string
  lon: string
  address: {
    road?: string
    neighbourhood?: string
    suburb?: string
    city?: string
    town?: string
    village?: string
    state?: string
    postcode?: string
  }
}

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (text: string) => void
  onSelect: (s: Suggestion & { display: string }) => void
}

export function AddressAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  onSelect
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const fetchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // limpa timers anteriores
    if (fetchTimer.current) clearTimeout(fetchTimer.current)
    if (hideTimer.current) clearTimeout(hideTimer.current)

    // se menos de 3 caracteres, limpa sugestões
    if (value.length < 3) {
      setSuggestions([])
      return
    }

    // debounce fetch de sugestões
    fetchTimer.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          value
        )}&format=json&limit=5&addressdetails=1`
        const res = await fetch(url, {
          headers: { 'User-Agent': 'YourApp/1.0 (email@example.com)' }
        })
        const data: Suggestion[] = await res.json()
        setSuggestions(data)
      } catch {
        setSuggestions([])
      }
    }, 400)

    // timer para esconder sugestões após 5s de inatividade
    hideTimer.current = setTimeout(() => {
      setSuggestions([])
    }, 5000)

    return () => {
      if (fetchTimer.current) clearTimeout(fetchTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [value])

  const handleSelect = (item: Suggestion) => {
    const rua = item.address.road || item.address.neighbourhood || item.address.suburb || ''
    const cidade = item.address.city || item.address.town || item.address.village || ''
    const estado = item.address.state || ''
    const cep = item.address.postcode || ''
    const parts = [rua.trim(), cidade.trim(), estado.trim()].filter(Boolean)
    const base = parts.join(', ')
    const display = cep ? `${base} - ${cep}` : base
    onSelect({ ...item, display })
    setSuggestions([])
    Keyboard.dismiss()
  }

  return (
    <View style={tw`mb-4 relative`}>
      <Text style={tw`text-gray-600 mb-1`}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={tw`border-2 border-[#313131] rounded-lg p-3`}
        autoCorrect={false}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <View
          style={tw`absolute top-14 w-full bg-white border border-gray-300 rounded-lg z-20 max-h-40`}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(item) => item.lat + item.lon}
            renderItem={({ item }) => (
              <TouchableOpacity
                onMouseDown={() => handleSelect(item) as any}
                onPress={() => handleSelect(item)}
                style={tw`px-3 py-2 border-b border-gray-200`}
              >
                <Text>
                  {item.address.road || item.address.neighbourhood || item.address.suburb}, {item.address.city}, {item.address.state}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}

export default AddressAutocomplete

