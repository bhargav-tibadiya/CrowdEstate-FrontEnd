import { useEffect, useState } from "react";
import styles from "./Filter.module.scss"

const Filter = ({ onFilterChange }) => {
    const [location, setLocation] = useState('');
    const [estateType, setEstateType] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [beds, setBeds] = useState('');
    const [sqft, setSqft] = useState('');
    const [extraFeatures, setExtraFeatures] = useState([]);


    const handleExtraFeaturesChange = (e) => {
        const selectedFeatures = Array.from(e.target.selectedOptions, option => option.value);
        setExtraFeatures(selectedFeatures);
    };

    useEffect(()=>{
        onFilterChange({
            location,
            estateType,
            priceRange,
            beds,
            sqft,
            extraFeatures, // Now this contains multiple selected features
        });
    }, [location, estateType, priceRange, beds, sqft, extraFeatures])

    return (
        <div className={styles.filter_container}>

            {/* Location */}
            <div className={styles.input_fields}>
                <div className={styles.fields}>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.fullWidth}
                        placeholder='New Delhi'
                    />
                </div>
            </div>

            {/* Type */}

            <div className={styles.input_fields}>
                <div className={styles.fields}>
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        name="type"
                        value={estateType}
                        onChange={(e) => setEstateType(e.target.value)}
                    >
                        <option value="">Select type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                    </select>
                </div>
            </div>

            {/* Price Range */}
            <div className={styles.input_fields}>
                <div className={styles.fields}>
                    <label htmlFor="Price range">Price Range</label>
                    <select
                        id="Price range"
                        name="Price range"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    >
                        
                        <option value="0-100000">Under ₹100,000</option>
                        <option value="100000-300000">₹100,000 - ₹300,000</option>
                        <option value="300000-500000">₹300,000 - ₹500,000</option>
                        <option value="500000-1000000">₹500,000 - ₹1,000,000</option>
                        <option value="1000000-">Over ₹1,000,000</option>
                    </select>
                </div>
            </div>

            {/* Beds */}
            <div className={`${styles.input_fields} ${styles.beds}`}>
                <div className={styles.fields}>
                    <label htmlFor="beds">beds</label>
                    <select
                        id="beds"
                        name="beds"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                    >
                        <option value="">Beds</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
            </div>

            {/* Sqft Range */}
            <div className={styles.input_fields}>
                <div className={styles.fields}>
                    <label htmlFor="Sqft">Sqft</label>
                    <select
                        id="Sqft"
                        name="Sqft"
                        value={sqft}
                        onChange={(e) => setSqft(e.target.value)}
                    >
                        <option value="0-1000">under 1000ft</option>
                        <option value="1000-1500">1000ft - 1500ft</option>
                        <option value="1500-2000">1500ft - 2000ft</option>
                        <option value="2000-2500">2000ft - 2500ft</option>
                        <option value="2500-3000">2500ft - 3000ft</option>
                        <option value="3000-">Over 3000ft</option>
                    </select>
                </div>
            </div>

            {/* Sqft Range */}
            <div className={styles.input_fields}>
                <div className={styles.fields}>
                    <label htmlFor="Extra-type">Extra Type</label>
                    <select
                        id="Extra-type"
                        name="Extra-type"
                        value={extraFeatures}
                        onChange={handleExtraFeaturesChange}
                    >
                        <option value="furniture">Furniture</option>
                        <option value="sofa">Sofa</option>
                        <option value="garage">Garage</option>
                        <option value="pool">Pool</option>
                        <option value="garden">Garden</option>

                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter
