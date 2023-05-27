## Installation

To use this project, follow these steps:

1. Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/your-username/your-project.git

   ```

2. Navigate to the projects directory:
   cd your-project

3. Install the project dependencies by running the following command:
   npm install

This command will install all the required packages and dependencies listed in the project's "package.json" file.

4. Once the installation is complete, you can start the project by running:
   npm run dev

   This will start the project and make it accessible at "http://localhost:3000" (or another specified port).
   
   

                                                         API Documentation - Event Management API

This documentation provides details on how to use the Event Management API to manage events.

Base URL: 'http://localhost:3000/api/v3/app'

Endpoints:

1.  Get Events
    . Method: GET
    . Endpoint: "/events"
    . Description: Retrieves a list of events.
    . Query Parameters:

        . "type" (optional): Filter events by type. Accepted value: "latest".
        . "limit" (optional): Number of events to retrieve. Default value: 10.
        . "page" (optional): Page number for pagination. Default value: 1.

    . Example Request:

        . "GET /api/v3/app/events?type=latest&limit=10&page=1"

    . Example Response:

        . Status: 200 OK
        . Response Body: Array of event objects.

2.  Get Event by ID

        . Method: GET
        . Endpoint: "/events/:id"
        . Description: Retrieves a specific event by its ID.
        . Path Parameter:
            . id: ID of the event.

        . Example Request:
            . "GET /api/v3/app/events/1234567890"

        . Example Response:
            . Status: 200 OK
            . Response Body: Event object.

3.  Create Event

        . Method: POST
        . Endpoint: "/events"
        . Description: Creates a new event.
        . Request Body: JSON object representing the event data Required fields:

            . "name": Event name.
            . "tagline": Event tagline.
            . "description": Event description.
            . "moderator": Moderator name.
            . "category": Event category.
            . "sub_category": Event sub-category.
            . "photo": Event photo (multipart/form-data).
            . "schedule" (optional): Event schedule (default: current date).
            . "rigor_rank" (optional): Event rigor rank.

        .Example Request:
            . POST /api/v3/app/events
            . Request Body:
                {
                "name": "Event Name",
                "tagline": "Event Tagline",
                "description": "Event Description",
                "moderator": "Moderator Name",
                "category": "Event Category",
                "sub_category": "Event Sub-Category",
                "photo": [event photo file],
                "schedule": "2023-06-01",
                "rigor_rank": 5
                }

        . Example Response:
            . Status: 200 OK
            . Response Body: Created event object.

4.  Update Event

        . Method: PUT
        . Endpoint: "/events/:id"
        . Description: Updates an existing event.
        . Path Parameter:
            .id: ID of the event to update.
        . Request Body: JSON object representing the updated event data. Fields to update:
            . "name" (optional): Event name.
            . "tagline" (optional): Event tagline.
            . "description" (optional): Event description.
            . "moderator" (optional): Moderator name.
            . "category" (optional): Event category.
            . "sub_category" (optional): Event sub-category.
            . "photo" (optional): Event photo (multipart/form-data).
            . "schedule" (optional): Event schedule.
            . "rigor_rank" (optional): Event rigor rank.
        . Example Request:
            . PUT /api/v3/app/events/1234567890
            . Request Body:

               {
                "name": "Updated Event Name",
                "tagline": "Updated Event Tagline",
                "description": "Updated Event Description"
                }

        . Example Response:
            . Status: 200 OK
            . Response Body: Updated event object.

5.  Delete Event

        . Method: DELETE
        . Endpoint: "/events/:id"
        . Description: Deletes an event.
        . Path Parameter:
            . "id": ID of the event to delete.
        . Example Request:
            . "DELETE /api/v3/app/events/1234567890"
        . Example Response:
            . Status: 200 OK
            . Response Body: Deleted event object.

Note: For the "Create Event" and "Update Event" endpoints, the "photo" field should be sent as multipart/form-data in the request payload.

Please adjust the base URL and paths accordingly if you're hosting the API on a different domain or port. Also, make sure to include any additional details or constraints specific to your API
