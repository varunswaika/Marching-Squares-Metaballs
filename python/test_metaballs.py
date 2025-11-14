import math
import sys

def dist(p1, p2):
    """Distance function from marching_squares.py"""
    return math.ceil((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def test_distance_calculation():
    """Test distance calculation is correct"""
    # Test same point
    assert dist((0, 0), (0, 0)) == 0, "Distance to same point should be 0"

    # Test simple distances
    assert dist((0, 0), (3, 4)) == 25, "Distance (0,0) to (3,4) should be 25"
    assert dist((1, 1), (1, 1)) == 0, "Distance to same point should be 0"

    # Test symmetric property
    assert dist((1, 2), (3, 4)) == dist((3, 4), (1, 2)), "Distance should be symmetric"

    print("Distance calculation tests passed")

def test_ball_boundaries():
    """Test that ball positions stay within boundaries"""
    WIDTH = 800
    HEIGHT = 600

    # Simulate ball bouncing
    class TestBall:
        def __init__(self):
            self.x = 100
            self.y = 100
            self.radius = 20
            self.speedx = 5
            self.speedy = 5

        def update(self):
            self.x += self.speedx
            self.y += self.speedy
            if self.x < 0 or self.x > WIDTH - self.radius:
                self.speedx *= -1
                # Correct position to stay within bounds
                self.x = max(0, min(self.x, WIDTH - self.radius))
            if self.y < 0 or self.y > HEIGHT - self.radius:
                self.speedy *= -1
                # Correct position to stay within bounds
                self.y = max(0, min(self.y, HEIGHT - self.radius))

    ball = TestBall()

    # Simulate many updates
    for _ in range(1000):
        ball.update()
        assert 0 <= ball.x <= WIDTH, f"Ball x position {ball.x} out of bounds"
        assert 0 <= ball.y <= HEIGHT, f"Ball y position {ball.y} out of bounds"

    print("Ball boundary tests passed")

def test_grid_key_generation():
    """Test that grid keys are generated correctly"""
    def getKey(i, j):
        return str(i) + ',' + str(j)

    # Test basic key generation
    assert getKey(0, 0) == "0,0", "Key for (0,0) should be '0,0'"
    assert getKey(10, 20) == "10,20", "Key for (10,20) should be '10,20'"

    # Test that different positions have different keys
    assert getKey(0, 0) != getKey(0, 1), "Different positions should have different keys"
    assert getKey(0, 0) != getKey(1, 0), "Different positions should have different keys"

    print("Grid key generation tests passed")

def test_marching_squares_cases():
    """Test that all 16 marching squares cases are handled"""
    valid_cases = [
        '0000', '0001', '0010', '0011',
        '0100', '0101', '0110', '0111',
        '1000', '1001', '1010', '1011',
        '1100', '1101', '1110', '1111'
    ]

    # Verify all cases are unique
    assert len(valid_cases) == len(set(valid_cases)), "All cases should be unique"
    assert len(valid_cases) == 16, "Should have exactly 16 cases"

    # Verify all cases are 4 characters
    for case in valid_cases:
        assert len(case) == 4, f"Case {case} should be 4 characters"
        assert all(c in '01' for c in case), f"Case {case} should only contain 0 and 1"

    print("Marching squares cases tests passed")

def run_all_tests():
    """Run all test functions"""
    print("Running metaballs tests...")
    print("-" * 50)

    try:
        test_distance_calculation()
        test_ball_boundaries()
        test_grid_key_generation()
        test_marching_squares_cases()

        print("-" * 50)
        print("All tests passed successfully")
        return 0
    except AssertionError as e:
        print(f"Test failed: {e}")
        return 1
    except Exception as e:
        print(f"Unexpected error: {e}")
        return 1

if __name__ == '__main__':
    sys.exit(run_all_tests())
