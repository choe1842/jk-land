import React, { useState, useEffect } from 'react';
import { 
  Building2, Search, Filter, TrendingUp, TrendingDown, MapPin, 
  Calculator, Calendar, ExternalLink, X, School, Train, Sparkles, Plus, 
  Star, Navigation as NavIcon, Compass, Sliders, RotateCcw, Award, GraduationCap, Flame, BarChart3, ChevronRight, MessageSquare
} from 'lucide-react';
import { APT2ME_REAL_ESTATE, APT2ME_SCHOOL_RANKINGS, CURRENT_YEAR } from '../../data/apt2meData';

export default function RealEstateView() {
  const [activeTab, setActiveTab] = useState('recovery'); // 'recovery' | 'gap' | 'ranking' | 'school' | 'gpsMap' | 'todays'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApt, setSelectedApt] = useState(null);

  // Filter state
  const [regionScope, setRegionScope] = useState('seoul_gyeonggi'); 
  const [minPrice, setMinPrice] = useState(90000); 
  const [maxPrice, setMaxPrice] = useState(120000); 
  const [maxAge, setMaxAge] = useState(32); 
  const [onlyMyApartments, setOnlyMyApartments] = useState(false);

  const [myApartments, setMyApartments] = useState(() => {
    const saved = localStorage.getItem('jk_apt2me_favs_v3');
    return saved ? JSON.parse(saved) : ['apt-target-1', 'apt-target-2', 'apt-high-1'];
  });

  const apartments = APT2ME_REAL_ESTATE;

  useEffect(() => {
    localStorage.setItem('jk_apt2me_favs_v3', JSON.stringify(myApartments));
  }, [myApartments]);

  const toggleFavorite = (e, aptId) => {
    e.stopPropagation();
    if (myApartments.includes(aptId)) {
      setMyApartments(myApartments.filter((id) => id !== aptId));
    } else {
      setMyApartments([...myApartments, aptId]);
    }
  };

  const resetAllFilters = () => {
    setRegionScope('all');
    setMinPrice(10000);
    setMaxPrice(500000);
    setMaxAge(50);
    setOnlyMyApartments(false);
    setSearchTerm('');
  };

  const applyDefaultPreset = () => {
    setRegionScope('seoul_gyeonggi');
    setMinPrice(90000);
    setMaxPrice(120000);
    setMaxAge(32);
    setOnlyMyApartments(false);
  };

  const filteredApartments = apartments.filter((apt) => {
    const matchSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.dong.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.roadNm.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchSearch) return false;
    if (onlyMyApartments && !myApartments.includes(apt.id)) return false;

    if (regionScope === 'seoul_gyeonggi' && apt.city !== 'seoul' && apt.city !== 'gyeonggi') return false;
    if (regionScope === 'gangnam3' && apt.regionCategory !== 'gangnam3') return false;
    if (regionScope === 'mayong' && apt.regionCategory !== 'mayong') return false;
    if (regionScope === 'nodogang' && apt.regionCategory !== 'nodogang') return false;
    if (regionScope === 'gyeonggi_south' && apt.regionCategory !== 'gyeonggi_south') return false;

    if (apt.dealPriceNum < minPrice || apt.dealPriceNum > maxPrice) return false;
    const aptAge = CURRENT_YEAR - apt.builtYear;
    if (aptAge > maxAge) return false;

    return true;
  });