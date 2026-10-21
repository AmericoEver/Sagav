// SAGAV - Geolocation & Region Detection Service

export const SUPPORTED_COUNTRIES = [
  { code: 'MZ', name: 'Moçambique', flag: '🇲🇿', defaultCurrency: 'MZN', regions: ['Maputo', 'Matola', 'Beira', 'Nampula', 'Tete', 'Pemba', 'Quelimane', 'Inhambane', 'Remoto Moçambique'] },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', defaultCurrency: 'AOA', regions: ['Luanda', 'Benguela', 'Huambo', 'Cabinda', 'Remoto Angola'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', defaultCurrency: 'EUR', regions: ['Lisboa', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Remoto Portugal'] },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', defaultCurrency: 'BRL', regions: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná', 'Santa Catarina', 'Remoto Brasil'] },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', defaultCurrency: 'USD', regions: ['Nova York', 'Califórnia', 'Texas', 'Flórida', 'Remoto EUA'] },
  { code: 'GL', name: 'Todo o Mundo (Global)', flag: '🌍', defaultCurrency: 'USD', regions: ['Remoto Global'] }
];

/**
 * Automatically detects user location via browser GPS or Timezone fallback
 */
export async function detectUserLocation() {
  // 1. Try browser GPS
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 6000,
          maximumAge: 600000
        });
      });

      const { latitude, longitude } = position.coords;
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
          headers: { 'Accept-Language': 'pt-BR,pt,en' }
        });
        if (res.ok) {
          const data = await res.json();
          const country = data.address?.country || 'Moçambique';
          const state = data.address?.state || data.address?.region || '';
          const city = data.address?.city || data.address?.town || data.address?.municipality || '';

          const matchedCountry = SUPPORTED_COUNTRIES.find(c => 
            country.toLowerCase().includes(c.name.toLowerCase()) || 
            c.name.toLowerCase().includes(country.toLowerCase())
          ) || SUPPORTED_COUNTRIES[0];

          return {
            success: true,
            source: 'gps',
            country: matchedCountry.name,
            countryCode: matchedCountry.code,
            flag: matchedCountry.flag,
            region: city ? `${city}` : (state || matchedCountry.regions[0]),
            latitude,
            longitude
          };
        }
      } catch (err) {
        console.warn('Geocoding API network issue, using timezone fallback', err);
      }
    } catch (gpsError) {
      console.log('GPS fallback to Timezone estimation:', gpsError.message);
    }
  }

  // 2. Intelligent Timezone Estimation (GMT+2 is Maputo)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

  if (timeZone.includes('Maputo') || timeZone.includes('Harare') || timeZone.includes('Johannesburg') || timeZone.includes('Gaborone')) {
    return {
      success: true,
      source: 'timezone',
      country: 'Moçambique',
      countryCode: 'MZ',
      flag: '🇲🇿',
      region: 'Maputo'
    };
  }

  if (timeZone.includes('Luanda')) {
    return {
      success: true,
      source: 'timezone',
      country: 'Angola',
      countryCode: 'AO',
      flag: '🇦🇴',
      region: 'Luanda'
    };
  }

  if (timeZone.includes('Lisbon') || timeZone.includes('Atlantic/Madeira') || timeZone.includes('Azores')) {
    return {
      success: true,
      source: 'timezone',
      country: 'Portugal',
      countryCode: 'PT',
      flag: '🇵🇹',
      region: 'Lisboa'
    };
  }

  if (timeZone.includes('Sao_Paulo') || timeZone.includes('Brazil') || timeZone.includes('Fortaleza') || timeZone.includes('Manaus') || timeZone.includes('Recife') || timeZone.includes('Belem')) {
    return {
      success: true,
      source: 'timezone',
      country: 'Brasil',
      countryCode: 'BR',
      flag: '🇧🇷',
      region: 'São Paulo'
    };
  }

  // Default fallback is Moçambique
  return {
    success: true,
    source: 'default',
    country: 'Moçambique',
    countryCode: 'MZ',
    flag: '🇲🇿',
    region: 'Maputo'
  };
}
