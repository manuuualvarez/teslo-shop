import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'

import { IProduct } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { AddminLayout } from '../../../components/layouts';
import { useForm } from 'react-hook-form';
import tesloApi from '../../../api/tesloApi';
import { Product } from '../../../models';
import { useRouter } from 'next/router';


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']


interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: string;
    gender: string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, formState: { errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    const [newTagValue, setnewTagValue] = useState('');
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
      const subsciption = watch(( value, {name, type}) => {
        if(name === 'title') {
            const newSlug = value.title?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || ''

            setValue('slug', newSlug);
        }
      })
      return () => subsciption.unsubscribe();
    }, [watch, setValue])
    

    const onChangeSize = (size: string) => {
        const currentSizes = getValues('sizes');
        if(currentSizes.includes(size)){
            return setValue('sizes', currentSizes.filter(s => s !== size), { shouldValidate: true })
        }
        setValue('sizes', [...currentSizes, size], { shouldValidate: true})
    }
    
    const onNewTag = () => {
        const newTag = newTagValue.trim().toLowerCase();
        setnewTagValue('');

        const currentTags = getValues('tags');

        if(currentTags.includes(newTag)){
            return;
        }

        currentTags.push(newTag);
    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter(t => t !== tag);
        setValue('tags', updatedTags, { shouldValidate: true })
    }

    const onFilesSelected =  async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if(!target.files || target.files.length === 0) {
            return;
        }
        try {
            // Save images in file system (never do it)
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await tesloApi.post<{message: string}>('/admin/upload', formData);
                setValue('images', [...getValues('images'), data.message], {shouldValidate: true});
            }
        } catch (error) {
            console.log(error)   
        }
    }

    const onDeleteImage = (image: string) => {
        setValue('images', getValues('images').filter( img => img !== image), { shouldValidate: true});
    }

    const onSubmitForm = async (form: FormData) => {
        if (form.images.length < 2 && form.tags.length == 0) return;
        setIsSaving(true);

        try {
            const { data } = await tesloApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: form
            });
            if(!form._id) {
                router.replace(`/admin/products/${ form.slug }`);
            } else {
                setIsSaving(false);
            }
            
        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }
    }

    return (

        <AddminLayout 
            title={'Product'} 
            subtitle={`Editing: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit(onSubmitForm) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Save
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Title"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'This field is mandatory',
                                minLength: { value: 2, message: 'Minimum 2 characters' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Description"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'This field is mandatory',
                                minLength: { value: 5, message: 'Minimum 5 characters' }
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Stock"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'This field is mandatory',
                                min: { value: 0, message: 'Minimum is 0' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Price"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'This field is mandatory',
                                min: { value: 0, message: 'Minimum is 0' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ ({target}) => setValue('type', target.value, { shouldValidate: true}) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({target}) => setValue('gender', target.value, { shouldValidate: true}) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Sizes</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                        key={size} 
                                        control={<Checkbox checked={ getValues('sizes').includes(size) }/>} 
                                        label={ size }
                                        onChange={ () => onChangeSize(size)} 
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'This field is mandatory',
                                validate: (val) => val.trim().includes(' ') ? 'This field can not use blank spaces' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />
                        {/* Tags and images */}
                        <TextField
                            label="Tags"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Touch [spacebar] to add"
                            value = { newTagValue }
                            onChange={ ({target}) => setnewTagValue(target.value)}
                            onKeyUp={ ({code}) => code === 'Space' ? onNewTag() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Images</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Upload Images
                            </Button>
                            <input
                                ref={ fileInputRef }
                                type={'file'}
                                multiple
                                accept='image/png, image/gif, image/jpeg'
                                style={{display: 'none'}}
                                onChange={ onFilesSelected }
                            />

                            <Chip 
                                label="At least 2 images are required"
                                color='error'
                                variant='outlined'
                                sx={{ mb: 2 , display: getValues('images').length < 2 ? 'flex' : 'none'}}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={  img  }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={() => onDeleteImage(img)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AddminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;

    let product: IProduct | null

    if (slug === 'new') {
        // Create a product
        const tempProduct = JSON.parse( JSON.stringify(new Product() ) );
        delete tempProduct._id;
        tempProduct.images = ['img1.jpg', 'img2.jpg'];
        product = tempProduct
    } else {
        // Edit product
        product = await dbProducts.getProductBySlug(slug.toString());
    }
    
    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    
    return {
        props: {
            product
        }
    }
}

export default ProductAdminPage