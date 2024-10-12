import { useEffect, useState } from "react";
import styles from "./Filter.module.scss"

const Filter = ({ onFilterChange }) => {
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState([]);
    const [priceRange, setPriceRange] = useState('');
    const [beds, setBeds] = useState('');
    const [sqft, setSqft] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        onFilterChange({
            location,
            tags,
            priceRange,
            beds,
            sqft,
            category,
        });
    }, [location, tags, priceRange, beds, sqft, category])

    const handleMultiSelectChange = (event, setStateFunction) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setStateFunction(selectedOptions);
      };

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
                    <label htmlFor="tags">Tags</label>
                    <select
                        id="tags"
                        name="tags"
                        value={tags}
                        onChange={(e) => handleMultiSelectChange(e, setTags)}
                    >
                        <option value="">Select Tags</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Affordable">Affordable</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                        <option value="Pet Friendly">Pet Friendly</option>
                        <option value="Near School">Near School</option>
                        <option value="Near Metro">Near Metro</option>
                        <option value="Gated Community">Gated Community</option>
                        <option value="Eco-Friendly">Eco-Friendly</option>
                        <option value="Smart Home">Smart Home</option>
                        <option value="Waterfront">Waterfront</option>
                        <option value="Mountain View">Mountain View</option>
                        <option value="City Center">City Center</option>
                        <option value="Garden">Garden</option>
                        <option value="Swimming Pool">Swimming Pool</option>
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
                        <option value="">Select Price Range</option>
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
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
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
                        <option value="">Select Size</option>
                        <option value="0-1000">under 1000ft</option>
                        <option value="1000-1500">1000ft - 1500ft</option>
                        <option value="1500-2000">1500ft - 2000ft</option>
                        <option value="2000-2500">2000ft - 2500ft</option>
                        <option value="2500-3000">2500ft - 3000ft</option>
                        <option value="3000">Over 3000ft</option>
                    </select>
                </div>
            </div>

            {/* Sqft Range */}
            <div className={styles.input_fields}>
                <div className={styles.fields}> 
                    <label htmlFor="Category">Category</label>
                    <select
                        id="Category"
                        name="Category"
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value)}}
                    >
                        <option value="">Select a category</option>
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Under Offer">Under Offer</option>
                        <option value="Rented">Rented</option>
                        <option value="Off Market">Off Market</option>

                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter
