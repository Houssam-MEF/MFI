<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <div class="container">

        <h1>Homepage</h1>

        <div class="container mt-5">
            <form action="{{ route('import') }}" method="POST" enctype="multipart/form-data">
                <div class="input-group mb-3">
                    @csrf
                    <input type="file" class="form-control" name="import_file" id="" />

                    <button class="btn">
                        Upload
                    </button>
                  </div>
            </form>

            <form method="POST" action="{{ route('truncateTable') }}">
                @csrf
                <button type="submit">Truncate Table</button>
            </form>


        </div>
    </div>
</body>
</html>
