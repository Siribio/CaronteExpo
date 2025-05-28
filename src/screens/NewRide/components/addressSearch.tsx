import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
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
  onSelect,
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const blurTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)

    if (value.length < 3) {
      setSuggestions([])
      setOpen(false)
      return
    }

    timer.current = setTimeout(async () => {
      try {
        const url = [
          'https://nominatim.openstreetmap.org/search',
          `?q=${encodeURIComponent(value)}`,
          '&format=json',
          '&limit=5',
          '&addressdetails=1',
        ].join('')

        const res = await fetch(url, {
          headers: { 'User-Agent': 'SeuApp/1.0 (seu@email.com)' },
        })
        const data: Suggestion[] = await res.json()
        setSuggestions(data)
        if (data.length > 0) setOpen(true)
      } catch {
        setSuggestions([])
        setOpen(false)
      }
    }, 500)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [value])

  const handleBlur = () => {
    // Espera um tempo antes de fechar para permitir clique na sugestão
    blurTimeout.current = setTimeout(() => setOpen(false), 200)
  }

  const handleFocus = () => {
    if (value.length >= 3 && suggestions.length > 0) {
      setOpen(true)
    }
    if (blurTimeout.current) clearTimeout(blurTimeout.current)
  }

  const renderItem = ({ item }: { item: Suggestion }) => {
    const rua = item.address.road || item.address.neighbourhood || item.address.suburb || ''
    const cidade = item.address.city || item.address.town || item.address.village || ''
    const estado = item.address.state || ''
    const cep = item.address.postcode || ''

    const parts = []
    if (rua.trim()) parts.push(rua.trim())
    if (cidade.trim()) parts.push(cidade.trim())
    if (estado.trim()) parts.push(estado.trim())
    const base = parts.join(', ')
    const display = cep ? `${base} - ${cep}` : base

    return (
      <TouchableOpacity
        style={tw`px-3 py-2 border-b border-gray-200`}
        onPress={() => {
          onSelect({ ...item, display })
          setOpen(false)
          Keyboard.dismiss()
        }}
      >
        <Text>{display}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-gray-600 mb-1`}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={tw`border-2 border-[#313131] rounded-lg p-3`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {open && suggestions.length > 0 && (
        <View style={tw`bg-white border border-gray-300 rounded-lg max-h-40 mt-1`}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(item) => item.lat + item.lon}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  )
}

export default AddressAutocomplete
