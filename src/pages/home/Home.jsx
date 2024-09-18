import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Home.module.scss'

import { useFormik } from "formik";
import * as Yup from 'yup';
import { MdError } from 'react-icons/md';

const propertySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Property name is required'),

  description: Yup.string()
    .trim()
    .required('Description is required'),

  price: Yup.number().
    required('Price is required'),

  category: Yup.string()
    .oneOf(['Available', 'Sold', 'Under Offer', 'Rented', 'Off Market'], 'Invalid category')
    .required('Category is required'),

  tags: Yup.array()
    .of(Yup.string())
    .required('At least one tag is required'),

  isCollaborative: Yup.boolean().
    required('Collaboration status is required'),

  maxContributors: Yup.number()
    .when('isCollaborative', {
      is: true,
      then: Yup.number().required('Max contributors are required')
    }),

  address: Yup.string().
    required('Address is required'),

  city: Yup.string().
    required('City is required'),

  state: Yup.string().
    required('State is required'),

  country: Yup.string().
    required('Country is required'),

  coordinates: Yup.object().shape({
    lat: Yup.number().required('Latitude is required'),
    lng: Yup.number().required('Longitude is required')
  }),

  size: Yup.number().
    required('Size is required'),

  bedrooms: Yup.number(),

  bathrooms: Yup.number(),

  yearBuilt: Yup.number(),
});

const Home = () => {

  const [isTagOpen, setIsTagOpen] = useState()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      tags: [],
      isCollaborative: false,
      maxContributors: '',
      address: '',
      city: '',
      state: '',
      country: '',
      coordinates: {
        lat: '',
        lng: ''
      },
      size: '',
      bedrooms: '',
      bathrooms: '',
      yearBuilt: '',
    },

    validationSchema: propertySchema,

    onSubmit: (values) => {
      console.log('Property Submitted: ', values);
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

  return (
    <div className={styles.home_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.home_content}>

        <div className={styles.property_form}>

          <form onSubmit={handleSubmit}>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="name">Property Name <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.name && errors.name ? <><span><MdError /> </span><span>{errors.name}</span></> : null}
              </div>
            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="description">Description <span className={styles.important}>*</span></label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.description && errors.description ? <><span><MdError /> </span><span>{errors.description}</span></> : null}
              </div>
            </div>

            {/* Price */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="price">Price <span className={styles.important}>*</span></label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.price && errors.price ? <><span><MdError /> </span><span>{errors.price}</span></> : null}
              </div>
            </div>

            {/* Category */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="category">Category <span className={styles.important}>*</span></label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                >
                  <option value="">Select a category</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Under Offer">Under Offer</option>
                  <option value="Rented">Rented</option>
                  <option value="Off Market">Off Market</option>
                </select>
              </div>
              <div className={styles.formik_error}>
                {touched.category && errors.category ? <><span><MdError /> </span><span>{errors.category}</span></> : null}
              </div>
            </div>

            {/* Tags */}
            <div className={styles.input_fields}>
              <div className={styles.tags_fields}>
                <label htmlFor="tags">Tags <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  id='tags'
                  name='tags'
                  onFocus={() => { setIsTagOpen(true) }}
                  onBlur={() => { setIsTagOpen(false) }}
                />
                <div className={`${styles.tagoptions} ${isTagOpen ? styles.show_options : ''}`}>
                  <div className={styles.tag_item}>Luxury</div>
                  <div className={styles.tag_item}>Affordable</div>
                  <div className={styles.tag_item}>New</div>
                  <div className={styles.tag_item}>Under Construction</div>
                  <div className={styles.tag_item}>Fully Furnished</div>
                  <div className={styles.tag_item}>Pet Friendly</div>
                  <div className={styles.tag_item}>Near School</div>
                  <div className={styles.tag_item}>Near Metro</div>
                  <div className={styles.tag_item}>Gated Community</div>
                  <div className={styles.tag_item}>Eco-Friendly</div>
                  <div className={styles.tag_item}>Smart Home</div>
                  <div className={styles.tag_item}>Waterfront</div>
                  <div className={styles.tag_item}>Mountain View</div>
                  <div className={styles.tag_item}>Garden</div>
                  <div className={styles.tag_item}>Swimming Pool</div>
                </div>
              </div>
              <div className={styles.formik_error}>
                {touched.tags && errors.tags ? <><span><MdError /> </span><span>{errors.tags}</span></> : null}
              </div>
            </div>

            {/* Is Collaborative */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="isCollaborative">Is Collaborative? <span className={styles.important}>*</span></label>
                <input
                  type="checkbox"
                  id="isCollaborative"
                  name="isCollaborative"
                  checked={values.isCollaborative}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.isCollaborative && errors.isCollaborative ? <><span><MdError /> </span><span>{errors.isCollaborative}</span></> : null}
              </div>
            </div>

            {/* Max Contributors */}
            {values.isCollaborative && (
              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="maxContributors">Max Contributors <span className={styles.important}>*</span></label>
                  <input
                    type="number"
                    id="maxContributors"
                    name="maxContributors"
                    value={values.maxContributors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.fullWidth}
                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.maxContributors && errors.maxContributors ? <><span><MdError /> </span><span>{errors.maxContributors}</span></> : null}
                </div>
              </div>
            )}

            {/* Location Fields */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="address">Address <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.address && errors.address ? <><span><MdError /> </span><span>{errors.address}</span></> : null}
              </div>
            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="city">City <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.city && errors.city ? <><span><MdError /> </span><span>{errors.city}</span></> : null}
              </div>
            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="state">State <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.state && errors.state ? <><span><MdError /> </span><span>{errors.state}</span></> : null}
              </div>
            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="country">Country <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.country && errors.country ? <><span><MdError /> </span><span>{errors.country}</span></> : null}
              </div>
            </div>

            {/* Coordinates */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="coordinates.lat">Latitude <span className={styles.important}>*</span></label>
                <input
                  type="number"
                  id="coordinates.lat"
                  name="coordinates.lat"
                  value={values.coordinates.lat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {(touched.coordinates?.lat && errors.coordinates?.lat) ? <><span><MdError /> </span><span>{errors.coordinates.lat}</span></> : null}
              </div>
            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="coordinates.lng">Longitude <span className={styles.important}>*</span></label>
                <input
                  type="number"
                  id="coordinates.lng"
                  name="coordinates.lng"
                  value={values.coordinates.lng}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {(touched.coordinates?.lng && errors.coordinates?.lng) ? <><span><MdError /> </span><span>{errors.coordinates.lng}</span></> : null}
              </div>
            </div>

            {/* Size */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="size">Size (sq ft) <span className={styles.important}>*</span></label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                />
              </div>
              <div className={styles.formik_error}>
                {touched.size && errors.size ? <><span><MdError /> </span><span>{errors.size}</span></> : null}
              </div>
            </div>









            <div className={styles.button_signup}>
              <button type="submit">Submit Property</button>
            </div>
          </form>

        </div>

        <div className={styles.instructions}>

        </div>


      </div >
    </div >
  )
}

export default Home