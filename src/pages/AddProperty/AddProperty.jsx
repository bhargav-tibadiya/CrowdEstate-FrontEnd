// Importing hooks
import { useCallback, useEffect, useState } from 'react';

// Importing Components and Styling
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './AddProperty.module.scss'

// Importing yup formik for form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Upload Utility
import { useDropzone } from 'react-dropzone';
import { imageUploadAPI } from '../../services/uploadApi';

// Other Utility
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { MdCloudUpload, MdError } from 'react-icons/md';
import { addPropertyAPI } from '../../services/propertyApi';



// Yup Validation Schema to validate each form field.
const propertySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Property name is required'),

  description: Yup.string()
    .trim()
    .required('Description is required'),

  image: Yup.string()
    .trim()
    .required('Image is required'),

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

  builtYear: Yup.number(),
});


const AddProperty = () => {

  const [isTagOpen, setIsTagOpen] = useState()
  const [tags, setTags] = useState([])

  // Formik Setup
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

      handleAddProperty(values);

      formik.resetForm( )
    },
  });

  const handleAddProperty = async (payload) => {
    try {

      const result = await addPropertyAPI(payload);

      console.log('result', result)
      if (result.success === true) {

        toast.success('Property Added Successfuly')

      } else {
        toast.error(result.message)
      }


    } catch (error) {

      console.log('Error While Adding property\n Check AddProperty.jsx #FE007', error);
      console.log('Reason :', error?.response?.data?.message)
      throw error

    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = formik

  // Effect to Fetch Current User Id from Cookie and Store it to Formik
  useEffect(() => {
    const userCookie = Cookies.get('user');  // Get the cookie named 'user'
    if (userCookie) {
      setFieldValue('listedBy', userCookie);  // Set the cookie value to 'listedBy' field in Formik
    }
  }, [setFieldValue]);

  // to handle Selection of tags and setting values to field 
  const handleTags = (tag) => {
    if (values.tags.includes(tag)) {
      const updatedTags = values.tags.filter(t => t !== tag);
      setTags(tags.filter((t) => t !== tag));
      setFieldValue('tags', updatedTags);
    } else {
      setTags([...tags, tag]);
      setFieldValue('tags', [...values.tags, tag]);
    }
  };

  // Image Uploading with React Dropzone Logic
  const onDrop = useCallback(async (acceptedFiles) => {

    const file = acceptedFiles[0];

    if (!file) return;

    console.log('file', file)

    const formData = new FormData();
    formData.append('imageFile', file);

    const response = await imageUploadAPI(formData)

    if (response.success) {
      toast.success("Image Uploaded SucessFully")
    } else {
      toast.success("Image Uploaded Failed")
    }

    setFieldValue('image', response.imageUrl);

  }, [setFieldValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 1048576, // 1MB in bytes
    multiple: false
  });

  return (
    <div className={styles.add_property_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.add_property_content}>

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
                  placeholder='Ex. Divergent Villa'
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
                  placeholder='Luxurious 4-bedroom villa with modern amenities, private pool, spacious garden, and stunning sea views. Located in an exclusive neighborhood, this home offers elegant interiors, a gourmet kitchen, and expansive outdoor spaces for ultimate relaxation.'
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
                  placeholder='41,250,000'
                />
              </div>
              <div className={styles.formik_error}>
                {touched.price && errors.price ? <><span><MdError /> </span><span>{errors.price}</span></> : null}
              </div>
            </div>

            {/* Image */}
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="image">Image <span className={styles.important}>*</span></label>
                <div
                  {...getRootProps()}
                  className={`${styles.fullWidth} ${styles.dropzone}`}
                >
                  <input {...getInputProps()} id="image" name="image" />
                  <div className={styles.dropzone_content}>
                    <MdCloudUpload size={24} />
                    {isDragActive ? (
                      <p>Drop the image here</p>
                    ) : (
                      <p>Drag & drop an image here, or click to select</p>
                    )}
                    {values.image && (
                      <p className={styles.file_name}>{values.image.name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.formik_error}>
                {touched.image && errors.image ?
                  <><span><MdError /> </span><span>{errors.image}</span></>
                  : null}
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
                <div
                  className={styles.divv}
                  type="text"
                  id='tags'
                  name='tags'
                  onClick={() => { setIsTagOpen(prev => !prev) }}
                >
                  {
                    tags.length == 0 ? 'Click here to see options' :
                      tags.map((tag, index) => {
                        return (
                          <span key={index}>{tag}</span>
                        )
                      })
                  }
                </div>
                <div className={`${styles.tagoptions} ${isTagOpen ? styles.show_options : ''}`}>
                  <div onClick={() => { handleTags('Luxury') }} className={styles.tag_item}>Luxury</div>
                  <div onClick={() => { handleTags('Affordable') }} className={styles.tag_item}>Affordable</div>
                  <div onClick={() => { handleTags('New') }} className={styles.tag_item}>New</div>
                  <div onClick={() => { handleTags('Under Construction') }} className={styles.tag_item}>Under Construction</div>
                  <div onClick={() => { handleTags('Fully Furnished<') }} className={styles.tag_item}>Fully Furnished</div>
                  <div onClick={() => { handleTags('Pet Friendly') }} className={styles.tag_item}>Pet Friendly</div>
                  <div onClick={() => { handleTags('Near School') }} className={styles.tag_item}>Near School</div>
                  <div onClick={() => { handleTags('Near Metro') }} className={styles.tag_item}>Near Metro</div>
                  <div onClick={() => { handleTags('Gated Community') }} className={styles.tag_item}>Gated Community</div>
                  <div onClick={() => { handleTags('Eco-Friendly') }} className={styles.tag_item}>Eco-Friendly</div>
                  <div onClick={() => { handleTags('Smart Home') }} className={styles.tag_item}>Smart Home</div>
                  <div onClick={() => { handleTags('Waterfront') }} className={styles.tag_item}>Waterfront</div>
                  <div onClick={() => { handleTags('Mountain View') }} className={styles.tag_item}>Mountain View</div>
                  <div onClick={() => { handleTags('Garden') }} className={styles.tag_item}>Garden</div>
                  <div onClick={() => { handleTags('Swimming Pool') }} className={styles.tag_item}>Swimming Pool</div>
                </div>
              </div>
              <div className={styles.formik_error}>
                {touched.tags && errors.tags ? <><span><MdError /> </span><span>{errors.tags}</span></> : null}
              </div>
            </div>

            {/* Is Collaborative */}
            <div className={styles.input_fields}>
              <div className={`${styles.fields} ${styles.colab_fields}`}>
                <label htmlFor="isCollaborative">Is Collaborative? <span className={styles.important}>*</span></label>
                <select
                  id="isCollaborative"
                  name="isCollaborative"
                  value={values.isCollaborative}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.fullWidth}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className={styles.formik_error}>
                {touched.isCollaborative && errors.isCollaborative ? <><span><MdError /> </span><span>{errors.isCollaborative}</span></> : null}
              </div>
            </div>

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
                  placeholder='5 Park Avenue'
                />
              </div>
              <div className={styles.formik_error}>
                {touched.address && errors.address ? <><span><MdError /> </span><span>{errors.address}</span></> : null}
              </div>
            </div>

            <div className={`${styles.input_fields} ${styles.address}`}>
              <div className={styles.address_item}>
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
                    placeholder='Surat'
                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.city && errors.city ? <><span><MdError /> </span><span>{errors.city}</span></> : null}
                </div>
              </div>

              <div className={styles.address_item}>
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
                    placeholder='Gujarat'
                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.state && errors.state ? <><span><MdError /> </span><span>{errors.state}</span></> : null}
                </div>
              </div>

              <div className={styles.address_item}>
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
                    placeholder='India'

                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.country && errors.country ? <><span><MdError /> </span><span>{errors.country}</span></> : null}
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div className={`${styles.input_fields} ${styles.coordinates}`}>
              <div className={styles.coordinates_item}>
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
                    placeholder='21.227341'
                  />
                </div>
                <div className={styles.formik_error}>
                  {(touched.coordinates?.lat && errors.coordinates?.lat) ? <><span><MdError /> </span><span>{errors.coordinates.lat}</span></> : null}
                </div>
              </div>
              <div className={styles.coordinates_item}>
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
                    placeholder='72.894547'
                  />
                </div>
                <div className={styles.formik_error}>
                  {(touched.coordinates?.lng && errors.coordinates?.lng) ? <><span><MdError /> </span><span>{errors.coordinates.lng}</span></> : null}
                </div>
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
                  placeholder='4250 SQ. FT'
                />
              </div>
              <div className={styles.formik_error}>
                {touched.size && errors.size ? <><span><MdError /> </span><span>{errors.size}</span></> : null}
              </div>
            </div>

            <div className={`${styles.input_fields} ${styles.info}`}>
              <div className={styles.info_info}>
                <div className={styles.fields}>
                  <label htmlFor="bedrooms">Bedrooms<span className={styles.important}>*</span></label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={values.bedrooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.fullWidth}
                    placeholder='4'
                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.bedrooms && errors.bedrooms ? <><span><MdError /> </span><span>{errors.bedrooms}</span></> : null}
                </div>
              </div>

              <div className={styles.info_info}>
                <div className={styles.fields}>
                  <label htmlFor="bathrooms">Bathrooms <span className={styles.important}>*</span></label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={values.bathrooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.fullWidth}
                    placeholder='3'
                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.bathrooms && errors.bathrooms ? <><span><MdError /> </span><span>{errors.bathrooms}</span></> : null}
                </div>
              </div>

              <div className={styles.info_info}>
                <div className={styles.fields}>
                  <label htmlFor="yearBuilt">Years Built<span className={styles.important}>*</span></label>
                  <input
                    type="number"
                    id="yearBuilt"
                    name="yearBuilt"
                    value={values.yearBuilt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.fullWidth}
                    placeholder='2021'

                  />
                </div>
                <div className={styles.formik_error}>
                  {touched.yearBuilt && errors.yearBuilt ? <><span><MdError /> </span><span>{errors.yearBuilt}</span></> : null}
                </div>
              </div>
            </div>

            <div className={styles.submit_btn}>
              <button type="submit">Submit Property</button>
            </div>
          </form>

        </div>

        <div className={styles.instructions}>
          <div className={styles.propertyTips}>
            <p>Property Listing Tips</p>
            <ul>
              <li>Set the <strong>Property Price</strong> or specify if it&apos;s negotiable in the <em>price</em> field.</li>
              <li><strong>Standard image size</strong> for the property thumbnail is <em>1024x576</em>.</li>
              <li>Use the <em>description</em> field to provide a detailed overview of the property, including key selling points.</li>
              <li>The <em>category</em> field helps organize listings (e.g., Residential, Commercial, Luxury).</li>
              <li>Add relevant <strong>tags</strong> to make the property easily searchable (e.g., Luxury, Near Metro, Gated Community).</li>
              <li>In the <em>isCollaborative</em> field, indicate if the property is available for collaborative purchasing or shared ownership.</li>
              <li>Provide the maximum number of contributors in the <em>maxContributors</em> field for collaborative purchases.</li>
              <li>Use the <em>address</em>, <em>city</em>, <em>state</em>, and <em>country</em> fields to ensure the property&apos;s location is accurate.</li>
              <li>Fill out the <em>coordinates (lat, lng)</em> fields to pinpoint the property on the map.</li>
              <li>Use the <em>size</em>, <em>bedrooms</em>, <em>bathrooms</em>, and <em>yearBuilt</em> fields to specify the property&apos;s details and construction year.</li>
              <li>Ensure the <em>listedBy</em> field is correctly filled with your user information to identify the seller or agent.</li>
              <li><strong>Update regularly:</strong> If any changes occur, such as price adjustments or new features, update the listing promptly.</li>
            </ul>
          </div>

        </div>

      </div >
    </div >
  )
}

export default AddProperty