import PostPreview from './PostPreview'

const posts = [
    {
        id:1,
        username: "john_doe",
        DatePosted: "2026-09-01",
        Name: "Sunset at the Beach",
        image: "/beach.jpg",
        Tag: ["beach", "sunset"],
        views: 1250,
        Likes: 342,
        Description: "Beautiful sunset at the beach this evening.",
        Comments: [
            { user: "sarah", comment: "What an amazing view!" },
            { user: "mike", comment: "The colours are incredible." },
            { user: "james", comment: "I need to visit this place." },
            { user: "emma", comment: "Absolutely beautiful!" }
        ]
    },
    {
        id:2,
        username: "photo_lover",
        DatePosted: "2026-09-02",
        Name: "Mountain Adventure",
        image: "/mountains.jpg",
        Tag: ["mountains", "hiking"],
        views: 2180,
        Likes: 587,
        Description: "Spent the weekend hiking through the mountains.",
        Comments: [
            { user: "alex", comment: "That looks like an incredible hike!" },
            { user: "lisa", comment: "Where was this taken?" },
            { user: "tom", comment: "The scenery is amazing." },
            { user: "chris", comment: "Adding this place to my bucket list." }
        ]
    },
    {
        id:3,
        username: "nature_guy",
        DatePosted: "2026-09-02",
        Name: "Morning Forest",
        image: "/forest.jpg",
        Tag: ["nature", "forest"],
        views: 945,
        Likes: 231,
        Description: "A peaceful morning walk through the forest.",
        Comments: [
            { user: "anna", comment: "This looks so peaceful." },
            { user: "david", comment: "I love the atmosphere in this photo." },
            { user: "sophie", comment: "Such a beautiful forest!" },
            { user: "ryan", comment: "Perfect place for a morning walk." }
        ]
    },
    {
        id:4,
        username: "city_snapper",
        DatePosted: "2026-09-03",
        Name: "City Lights",
        image: "/city.jpg",
        Tag: ["city", "night"],
        views: 3420,
        Likes: 812,
        Description: "The city looks completely different at night.",
        Comments: [
            { user: "jack", comment: "The lights look incredible." },
            { user: "mia", comment: "Great night photography!" },
            { user: "daniel", comment: "Which city is this?" },
            { user: "olivia", comment: "This would make a great wallpaper." }
        ]
    },
    {
        id:5,
        username: "travel_addict",
        DatePosted: "2026-09-03",
        Name: "Hidden Waterfall",
        image: "/waterfall.jpg",
        Tag: ["waterfall", "travel"],
        views: 2765,
        Likes: 694,
        Description: "Found this hidden waterfall while exploring the countryside.",
        Comments: [
            { user: "ben", comment: "Wow, this place is beautiful!" },
            { user: "kate", comment: "How did you find this spot?" },
            { user: "sam", comment: "The water looks so clear." },
            { user: "lucy", comment: "Definitely worth the adventure!" }
        ]
    }
];


function HomeFeed(){

    return(
        <div>
            <PostPreview posts={posts} />
        </div>
    )
}

export default HomeFeed;