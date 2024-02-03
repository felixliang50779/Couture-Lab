import { Input, Select, Button, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';

import styles from './BasicInfo.module.css';

const options = {
    gender: ['male', 'female'],
    ageGroup: ['under18', '18to25', '26to35', '36to45', '46to55', 'over55'],
    preferredStyle: ['casual', 'formal', 'business', 'sporty', 'bohemian', 'vintage', 'preppy', 'other'],
    hairColor: ['black', 'brown', 'blonde', 'red', 'grey', 'white', 'other'],
    skinTone: ['very fair', 'fair', 'medium', 'olive', 'brown', 'dark brown', 'other'],
    eyeColor: ['brown', 'blue', 'green', 'hazel', 'grey', 'other'],
    bodyType: ['hourglass', 'triangle', 'inverted triangle', 'rectangle', 'round', 'other'],
    experimentLevel: ['not comfortable', 'somewhat comfortable', 'very comfortable'],
    budget: ['low', 'medium', 'high'],
    sustainabilityImportance: ['not important', 'somewhat important', 'very important'],
    frequentEvents: ['work', 'Ccasual outings', 'formal events', 'fitness', 'travel', 'other'],
};

const SelectInput = ({ placeholder, options }) => (
    <Select placeholder={placeholder}>
        {options.map((option) => (
            <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
        ))}
    </Select>
);

export default function BasicInfo() {
    return (
        <div className={styles['basicinfo-container']}>
            <h1>Sign Up</h1>
            <section className={styles['inputinfo-container']}>
                <FormControl>
                    <h1>Basic Information</h1>
                    <FormLabel>What should we call you?</FormLabel>
                    <Input placeholder='Name' />
                    <Input placeholder='Username' />
                    <SelectInput placeholder='Select gender' options={options.gender} />
                    <SelectInput placeholder='Age Group' options={options.ageGroup} />
                    <FormHelperText>Your age group helps us tailor suggestions more appropriately</FormHelperText>

                    <h1>Fashion Preferences</h1>
                    <FormLabel>Which style best describes your everyday fashion?</FormLabel>
                    <SelectInput placeholder='Preferred Style' options={options.preferredStyle} />

                    <h1>Personal Characteristics</h1>
                    <h2>These questions help the AI suggest colors that complement your look.</h2>
                    
                    <FormLabel>What's your hair color?</FormLabel>
                    <SelectInput placeholder='Hair Color' options={options.hairColor} />
                    <FormLabel>What's your skin tone?</FormLabel>
                    <SelectInput placeholder='Skin Tone' options={options.skinTone} />
                    <FormLabel>What's your eye color?</FormLabel>
                    <SelectInput placeholder='Eye Color' options={options.eyeColor} />

                    <h1>Body type and Comfort</h1>
                    <FormLabel>Identifying your body type helps us suggest the most flattering outfits</FormLabel>
                    <SelectInput placeholder='Body Type' options={options.bodyType} />
                    <FormLabel>How open are you to trying new fashion styles?</FormLabel>
                    <SelectInput placeholder='Experiment Level' options={options.experimentLevel} />

                    <h1>Body type and Comfort</h1>
                    <FormLabel>Identifying your body type helps us suggest the most flattering outfits</FormLabel>
                    <SelectInput placeholder='Body Type' options={options.bodyType} />
                    <FormLabel>How open are you to trying new fashion styles?</FormLabel>
                    <SelectInput placeholder='Experiment Level' options={options.experimentLevel} />

                    <h1>Shopping and Wardrobe Preferences</h1>
                    <FormLabel>Understanding your budget allows us to recommend clothes that fit your wallet</FormLabel>
                    <SelectInput placeholder='Budget' options={options.budget} />
                    <FormLabel>Which brands do you love? We'll try to find similar styles and introduce new brands.</FormLabel>
                    <Input placeholder='Tell us your brands here.' />
                    <FormLabel>How important is sustainability in fashion to you?</FormLabel>
                    <SelectInput placeholder='Sustainability Importance' options={options.sustainabilityImportance} />

                    <h1>Events and Occasions</h1>
                    <FormLabel>What types of events do you dress for most often?</FormLabel>
                    <SelectInput placeholder='Frequent Events' options={options.frequentEvents} />
                    <Button colorScheme='blue'>Continue</Button>
                </FormControl>
            </section>
        </div>
    );
}